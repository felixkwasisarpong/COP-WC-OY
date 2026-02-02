from datetime import date, datetime
from pydantic import BaseModel


class AnnouncementBase(BaseModel):
    title: str
    body: str
    start_date: date | None = None
    end_date: date | None = None
    is_active: bool = True


class AnnouncementCreate(AnnouncementBase):
    pass


class AnnouncementUpdate(BaseModel):
    title: str | None = None
    body: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    is_active: bool | None = None


class AnnouncementOut(AnnouncementBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
