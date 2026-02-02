from datetime import datetime
from pydantic import BaseModel


class MediaBase(BaseModel):
    title: str
    description: str | None = None
    is_public: bool = True
    downloads_enabled: bool = False


class MediaCreate(MediaBase):
    pass


class MediaUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    is_public: bool | None = None
    downloads_enabled: bool | None = None


class MediaOut(MediaBase):
    id: int
    filename: str
    content_type: str
    size_bytes: int
    storage_key: str
    uploaded_at: datetime
    uploaded_by_id: int | None = None

    model_config = {"from_attributes": True}
