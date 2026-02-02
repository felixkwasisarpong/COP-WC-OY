from datetime import date, datetime
from pydantic import BaseModel


class SermonBase(BaseModel):
    title: str
    speaker: str
    sermon_date: date
    scripture: str
    description: str | None = None
    video_url: str | None = None
    audio_url: str | None = None
    thumbnail_media_id: int | None = None


class SermonCreate(SermonBase):
    pass


class SermonUpdate(BaseModel):
    title: str | None = None
    speaker: str | None = None
    sermon_date: date | None = None
    scripture: str | None = None
    description: str | None = None
    video_url: str | None = None
    audio_url: str | None = None
    thumbnail_media_id: int | None = None


class SermonOut(SermonBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
