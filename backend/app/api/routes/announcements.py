from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.announcement import Announcement
from app.schemas.announcement import AnnouncementCreate, AnnouncementOut, AnnouncementUpdate
from app.schemas.pagination import Page

router = APIRouter()


@router.get("/", response_model=Page[AnnouncementOut])
def list_announcements(
    db: Session = Depends(deps.get_db),
    offset: int = 0,
    limit: int = 20,
    active_only: bool = True,
    current_user=Depends(deps.get_optional_user),
) -> Page[AnnouncementOut]:
    query = db.query(Announcement).order_by(Announcement.created_at.desc())
    if (not current_user or current_user.role.value != "admin") and active_only:
        query = query.filter(Announcement.is_active.is_(True))
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return Page(items=items, total=total, limit=limit, offset=offset)


@router.post("/", response_model=AnnouncementOut, status_code=201)
def create_announcement(
    payload: AnnouncementCreate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> AnnouncementOut:
    announcement = Announcement(**payload.model_dump())
    db.add(announcement)
    db.commit()
    db.refresh(announcement)
    return announcement


@router.put("/{announcement_id}", response_model=AnnouncementOut)
def update_announcement(
    announcement_id: int,
    payload: AnnouncementUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> AnnouncementOut:
    announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(announcement, key, value)
    db.commit()
    db.refresh(announcement)
    return announcement


@router.delete("/{announcement_id}", status_code=204)
def delete_announcement(
    announcement_id: int,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> None:
    announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    db.delete(announcement)
    db.commit()
    return None
