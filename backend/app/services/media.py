from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.storage.local import LocalStorage

storage = LocalStorage(settings.media_root)


def save_media(
    db: Session,
    file: UploadFile,
    title: str,
    description: str | None,
    is_public: bool,
    downloads_enabled: bool,
    uploaded_by_id: int | None,
) -> MediaAsset:
    storage_key, _, size = storage.save(file)
    media = MediaAsset(
        title=title,
        description=description,
        filename=file.filename or storage_key,
        content_type=file.content_type or "application/octet-stream",
        size_bytes=size,
        storage_key=storage_key,
        uploaded_by_id=uploaded_by_id,
        is_public=is_public,
        downloads_enabled=downloads_enabled,
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media
