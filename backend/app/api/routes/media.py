from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api import deps
from app.models.event import Event, EventMedia
from app.models.leader import Leader
from app.models.livestream import LivestreamConfig
from app.models.media import MediaAsset
from app.models.sermon import Sermon
from app.models.site_content import SiteContent
from app.schemas.media import MediaOut, MediaUpdate
from app.schemas.pagination import Page
from app.services.media import save_media
from app.storage.local import LocalStorage
from app.core.config import settings

router = APIRouter()


def _clear_media_references(db: Session, media_id: int) -> None:
    db.query(EventMedia).filter(EventMedia.media_id == media_id).delete(synchronize_session=False)
    db.query(Event).filter(Event.cover_image_id == media_id).update(
        {Event.cover_image_id: None},
        synchronize_session=False,
    )
    db.query(Sermon).filter(Sermon.thumbnail_media_id == media_id).update(
        {Sermon.thumbnail_media_id: None},
        synchronize_session=False,
    )
    db.query(Leader).filter(Leader.photo_media_id == media_id).update(
        {Leader.photo_media_id: None},
        synchronize_session=False,
    )
    db.query(LivestreamConfig).filter(LivestreamConfig.cover_image_id == media_id).update(
        {LivestreamConfig.cover_image_id: None},
        synchronize_session=False,
    )
    db.query(SiteContent).filter(SiteContent.hero_media_id == media_id).update(
        {SiteContent.hero_media_id: None},
        synchronize_session=False,
    )
    db.query(SiteContent).filter(SiteContent.about_media_id == media_id).update(
        {SiteContent.about_media_id: None},
        synchronize_session=False,
    )
    db.query(SiteContent).filter(SiteContent.ministries_media_id == media_id).update(
        {SiteContent.ministries_media_id: None},
        synchronize_session=False,
    )
    db.query(SiteContent).filter(SiteContent.contact_media_id == media_id).update(
        {SiteContent.contact_media_id: None},
        synchronize_session=False,
    )


def _clear_all_media_references(db: Session) -> None:
    db.query(EventMedia).delete(synchronize_session=False)
    db.query(Event).update({Event.cover_image_id: None}, synchronize_session=False)
    db.query(Sermon).update({Sermon.thumbnail_media_id: None}, synchronize_session=False)
    db.query(Leader).update({Leader.photo_media_id: None}, synchronize_session=False)
    db.query(LivestreamConfig).update({LivestreamConfig.cover_image_id: None}, synchronize_session=False)
    db.query(SiteContent).update(
        {
            SiteContent.hero_media_id: None,
            SiteContent.about_media_id: None,
            SiteContent.ministries_media_id: None,
            SiteContent.contact_media_id: None,
        },
        synchronize_session=False,
    )


@router.get("/", response_model=Page[MediaOut])
def list_media(
    db: Session = Depends(deps.get_db),
    offset: int = 0,
    limit: int = 20,
    current_user=Depends(deps.get_optional_user),
) -> Page[MediaOut]:
    query = db.query(MediaAsset).order_by(MediaAsset.uploaded_at.desc())
    if not current_user or current_user.role.value != "admin":
        query = query.filter(MediaAsset.is_public.is_(True))
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return Page(items=items, total=total, limit=limit, offset=offset)


@router.post("/upload", response_model=MediaOut, status_code=201)
def upload_media(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str | None = Form(None),
    is_public: bool = Form(True),
    downloads_enabled: bool = Form(False),
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.require_admin),
) -> MediaOut:
    media = save_media(
        db,
        file=file,
        title=title,
        description=description,
        is_public=is_public,
        downloads_enabled=downloads_enabled,
        uploaded_by_id=current_user.id,
    )
    return media


@router.get("/{media_id}", response_model=MediaOut)
def get_media(
    media_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_optional_user),
) -> MediaOut:
    media = db.query(MediaAsset).filter(MediaAsset.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    if not media.is_public and (not current_user or current_user.role.value != "admin"):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return media


@router.put("/{media_id}", response_model=MediaOut)
def update_media(
    media_id: int,
    payload: MediaUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> MediaOut:
    media = db.query(MediaAsset).filter(MediaAsset.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(media, key, value)
    db.commit()
    db.refresh(media)
    return media


@router.get("/{media_id}/download")
def download_media(
    media_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_active_user),
) -> FileResponse:
    media = db.query(MediaAsset).filter(MediaAsset.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    if not media.downloads_enabled:
        raise HTTPException(status_code=403, detail="Downloads disabled")
    storage = LocalStorage(settings.media_root)
    file_path = storage.open(media.storage_key)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File missing")
    return FileResponse(
        path=str(file_path),
        media_type=media.content_type,
        filename=media.filename,
    )


@router.get("/{media_id}/view")
def view_media(
    media_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_optional_user),
) -> FileResponse:
    media = db.query(MediaAsset).filter(MediaAsset.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    if not media.is_public and (not current_user or current_user.role.value != "admin"):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    storage = LocalStorage(settings.media_root)
    file_path = storage.open(media.storage_key)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File missing")
    return FileResponse(path=str(file_path), media_type=media.content_type)


@router.delete("/{media_id}")
def delete_media(
    media_id: int,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> dict:
    media = db.query(MediaAsset).filter(MediaAsset.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    storage_key = media.storage_key
    _clear_media_references(db, media_id)
    db.delete(media)
    db.commit()
    storage = LocalStorage(settings.media_root)
    storage.delete(storage_key)
    return {"deleted": True, "id": media_id}


@router.delete("/")
def delete_all_media(
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> dict:
    media_items = db.query(MediaAsset.storage_key).all()
    storage_keys = [item.storage_key for item in media_items]
    _clear_all_media_references(db)
    deleted = db.query(MediaAsset).delete(synchronize_session=False)
    db.commit()
    storage = LocalStorage(settings.media_root)
    for storage_key in storage_keys:
        storage.delete(storage_key)
    return {"deleted": deleted}
