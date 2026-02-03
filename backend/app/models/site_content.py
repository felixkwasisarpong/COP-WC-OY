from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class SiteContent(Base):
    __tablename__ = "site_content"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    hero_media_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    featured_sermon_id: Mapped[int | None] = mapped_column(ForeignKey("sermons.id"), nullable=True)
    featured_event_id: Mapped[int | None] = mapped_column(ForeignKey("events.id"), nullable=True)
    about_media_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    ministries_media_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    contact_media_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    social_facebook_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    social_instagram_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    social_youtube_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    social_tiktok_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
