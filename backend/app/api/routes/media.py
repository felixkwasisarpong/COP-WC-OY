from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api import deps
from app.models.media import MediaAsset
from app.schemas.media import MediaOut, MediaUpdate
from app.schemas.pagination import Page
from app.services.media import save_media
from app.storage.local import LocalStorage
from app.core.config import settings

router = APIRouter()


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
