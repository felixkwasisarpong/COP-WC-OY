from datetime import datetime

from sqlalchemy import String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class LivestreamConfig(Base):
    __tablename__ = "livestream_configs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    embed_url: Mapped[str] = mapped_column(String(500), nullable=False)
    is_live: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    schedule_text: Mapped[str | None] = mapped_column(String(255), nullable=True)
    cover_image_id: Mapped[int | None] = mapped_column(ForeignKey("media_assets.id"), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    cover_image = relationship("MediaAsset")
