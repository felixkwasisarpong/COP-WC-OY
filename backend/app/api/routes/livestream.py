from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.livestream import LivestreamConfig
from app.schemas.livestream import LivestreamOut, LivestreamUpdate

router = APIRouter()


@router.get("/", response_model=LivestreamOut)
def get_livestream(db: Session = Depends(deps.get_db)) -> LivestreamOut:
    config = db.query(LivestreamConfig).first()
    if not config:
        raise HTTPException(status_code=404, detail="Livestream config not found")
    return config


@router.put("/", response_model=LivestreamOut)
def update_livestream(
    payload: LivestreamUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> LivestreamOut:
    config = db.query(LivestreamConfig).first()
    if not config:
        config = LivestreamConfig(embed_url=payload.embed_url or "")
        db.add(config)
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(config, key, value)
    db.commit()
    db.refresh(config)
    return config
