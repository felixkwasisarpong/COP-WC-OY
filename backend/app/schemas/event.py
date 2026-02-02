from datetime import datetime
from pydantic import BaseModel


class EventBase(BaseModel):
    title: str
    description: str | None = None
    location: str
    start_time: datetime
    end_time: datetime | None = None
    cover_image_id: int | None = None
    is_public: bool = True


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    start_time: datetime | None = None
    end_time: datetime | None = None
    cover_image_id: int | None = None
    is_public: bool | None = None


class EventOut(EventBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
