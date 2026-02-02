from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.sermon import Sermon
from app.schemas.pagination import Page
from app.schemas.sermon import SermonCreate, SermonOut, SermonUpdate

router = APIRouter()


@router.get("/", response_model=Page[SermonOut])
def list_sermons(
    db: Session = Depends(deps.get_db),
    offset: int = 0,
    limit: int = 20,
) -> Page[SermonOut]:
    query = db.query(Sermon).order_by(Sermon.sermon_date.desc())
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return Page(items=items, total=total, limit=limit, offset=offset)


@router.get("/{sermon_id}", response_model=SermonOut)
def get_sermon(sermon_id: int, db: Session = Depends(deps.get_db)) -> SermonOut:
    sermon = db.query(Sermon).filter(Sermon.id == sermon_id).first()
    if not sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    return sermon


@router.post("/", response_model=SermonOut, status_code=201)
def create_sermon(
    payload: SermonCreate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> SermonOut:
    sermon = Sermon(**payload.model_dump())
    db.add(sermon)
    db.commit()
    db.refresh(sermon)
    return sermon


@router.put("/{sermon_id}", response_model=SermonOut)
def update_sermon(
    sermon_id: int,
    payload: SermonUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> SermonOut:
    sermon = db.query(Sermon).filter(Sermon.id == sermon_id).first()
    if not sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(sermon, key, value)
    db.commit()
    db.refresh(sermon)
    return sermon


@router.delete("/{sermon_id}", status_code=204)
def delete_sermon(
    sermon_id: int,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> None:
    sermon = db.query(Sermon).filter(Sermon.id == sermon_id).first()
    if not sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    db.delete(sermon)
    db.commit()
    return None
