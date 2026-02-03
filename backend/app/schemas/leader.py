from datetime import datetime
from pydantic import BaseModel


class LeaderBase(BaseModel):
    name: str
    role: str
    focus: str | None = None
    bio: str | None = None
    photo_media_id: int | None = None
    is_active: bool = True
    sort_order: int = 0


class LeaderCreate(LeaderBase):
    pass


class LeaderUpdate(BaseModel):
    name: str | None = None
    role: str | None = None
    focus: str | None = None
    bio: str | None = None
    photo_media_id: int | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class LeaderOut(LeaderBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
