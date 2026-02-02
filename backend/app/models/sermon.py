from datetime import date, datetime

from sqlalchemy import String, Date, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class Sermon(Base):
    __tablename__ = "sermons"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    speaker: Mapped[str] = mapped_column(String(255), nullable=False)
    sermon_date: Mapped[date] = mapped_column(Date, nullable=False)
    scripture: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    video_url: Mapped[str] = mapped_column(String(500), nullable=True)
    audio_url: Mapped[str] = mapped_column(String(500), nullable=True)
    thumbnail_media_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    thumbnail = relationship("MediaAsset")
