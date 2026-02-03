from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.leader import Leader
from app.schemas.leader import LeaderCreate, LeaderOut, LeaderUpdate
from app.schemas.pagination import Page

router = APIRouter()


@router.get("/", response_model=Page[LeaderOut])
def list_leaders(
    db: Session = Depends(deps.get_db),
    offset: int = 0,
    limit: int = 50,
    current_user=Depends(deps.get_optional_user),
) -> Page[LeaderOut]:
    query = db.query(Leader).order_by(Leader.sort_order.asc(), Leader.created_at.desc())
    if not current_user or current_user.role.value != "admin":
        query = query.filter(Leader.is_active.is_(True))
    total = query.count()
    items = query.offset(offset).limit(limit).all()
    return Page(items=items, total=total, limit=limit, offset=offset)


@router.get("/{leader_id}", response_model=LeaderOut)
def get_leader(
    leader_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_optional_user),
) -> LeaderOut:
    leader = db.query(Leader).filter(Leader.id == leader_id).first()
    if not leader:
        raise HTTPException(status_code=404, detail="Leader not found")
    if not leader.is_active and (not current_user or current_user.role.value != "admin"):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return leader


@router.post("/", response_model=LeaderOut, status_code=201)
def create_leader(
    payload: LeaderCreate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> LeaderOut:
    leader = Leader(**payload.model_dump())
    db.add(leader)
    db.commit()
    db.refresh(leader)
    return leader


@router.put("/{leader_id}", response_model=LeaderOut)
def update_leader(
    leader_id: int,
    payload: LeaderUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> LeaderOut:
    leader = db.query(Leader).filter(Leader.id == leader_id).first()
    if not leader:
        raise HTTPException(status_code=404, detail="Leader not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(leader, key, value)
    db.commit()
    db.refresh(leader)
    return leader


@router.delete("/{leader_id}", status_code=204)
def delete_leader(
    leader_id: int,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> None:
    leader = db.query(Leader).filter(Leader.id == leader_id).first()
    if not leader:
        raise HTTPException(status_code=404, detail="Leader not found")
    db.delete(leader)
    db.commit()
    return None
