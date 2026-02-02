from typing import Protocol
from fastapi import UploadFile


class StorageProvider(Protocol):
    def save(self, file: UploadFile) -> tuple[str, str, int]:
        ...

    def open(self, storage_key: str):
        ...
