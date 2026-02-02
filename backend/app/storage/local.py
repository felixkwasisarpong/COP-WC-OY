import uuid
from pathlib import Path
from fastapi import UploadFile


class LocalStorage:
    def __init__(self, root: str) -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)

    def save(self, file: UploadFile) -> tuple[str, str, int]:
        extension = Path(file.filename or "").suffix
        storage_key = f"{uuid.uuid4().hex}{extension}"
        destination = self.root / storage_key
        size = 0
        with destination.open("wb") as out_file:
            while chunk := file.file.read(1024 * 1024):
                size += len(chunk)
                out_file.write(chunk)
        return storage_key, str(destination), size

    def open(self, storage_key: str) -> Path:
        return self.root / storage_key
