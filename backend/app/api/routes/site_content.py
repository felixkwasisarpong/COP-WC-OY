from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.models.site_content import SiteContent
from datetime import datetime
from app.schemas.site_content import SiteContentOut, SiteContentUpdate

router = APIRouter()


@router.get("/", response_model=SiteContentOut)
def get_site_content(db: Session = Depends(deps.get_db)) -> SiteContentOut:
    content = db.query(SiteContent).first()
    if not content:
        content = SiteContent()
        db.add(content)
        db.commit()
        db.refresh(content)
    return content


@router.put("/", response_model=SiteContentOut)
def update_site_content(
    payload: SiteContentUpdate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> SiteContentOut:
    content = db.query(SiteContent).first()
    if not content:
        content = SiteContent()
        db.add(content)
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(content, key, value)
    content.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(content)
    return content
