from datetime import datetime
from pydantic import BaseModel


class SiteContentBase(BaseModel):
    hero_media_id: int | None = None
    featured_sermon_id: int | None = None
    featured_event_id: int | None = None
    about_media_id: int | None = None
    ministries_media_id: int | None = None
    contact_media_id: int | None = None
    social_facebook_url: str | None = None
    social_instagram_url: str | None = None
    social_youtube_url: str | None = None
    social_tiktok_url: str | None = None


class SiteContentUpdate(BaseModel):
    hero_media_id: int | None = None
    featured_sermon_id: int | None = None
    featured_event_id: int | None = None
    about_media_id: int | None = None
    ministries_media_id: int | None = None
    contact_media_id: int | None = None
    social_facebook_url: str | None = None
    social_instagram_url: str | None = None
    social_youtube_url: str | None = None
    social_tiktok_url: str | None = None


class SiteContentOut(SiteContentBase):
    id: int
    updated_at: datetime

    model_config = {"from_attributes": True}
