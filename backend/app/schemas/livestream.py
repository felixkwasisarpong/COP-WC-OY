from datetime import datetime
from pydantic import BaseModel


class LivestreamBase(BaseModel):
    embed_url: str
    is_live: bool = False
    schedule_text: str | None = None
    cover_image_id: int | None = None


class LivestreamUpdate(BaseModel):
    embed_url: str | None = None
    is_live: bool | None = None
    schedule_text: str | None = None
    cover_image_id: int | None = None


class LivestreamOut(LivestreamBase):
    id: int
    updated_at: datetime

    model_config = {"from_attributes": True}
