from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.event import Event
from app.schemas.event import EventCreate, EventOut, EventUpdate
from app.schemas.pagination import Page

router = APIRouter()


@router.get("/", response_model=Page[EventOut])
def list_events(
    db: Session = Depends(deps.get_db),
    offset: int = 0,
    limit: int = 20,
    upcoming_only: bool = False,
    current_user=Depends(deps.get_optional_user),
) -> Page[EventOut]:
    query = db.query(Event).order_by(Event.start_time.asc())
    if not current_user or current_user.role.value != "admin":
        query = query.filter(Event.is_public.is_(True))
    if upcoming_only:
        query = query.filter(Event.start_time >= datetime.utcnow())
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return Page(items=items, total=total, limit=limit, offset=offset)


@router.get("/{event_id}", response_model=EventOut)
def get_event(
    event_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_optional_user),
) -> EventOut:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if not event.is_public and (not current_user or current_user.role.value != "admin"):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return event


@router.post("/", response_model=EventOut, status_code=201)
def create_event(
    payload: EventCreate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> EventOut:
    event = Event(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.put("/{event_id}", response_model=EventOut)
def update_event(
    event_id: int,
    payload: EventUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> EventOut:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=204)
def delete_event(
    event_id: int,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> None:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return None
