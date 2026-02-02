from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator
from app.models.user import UserRole


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole
    is_active: bool


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole = UserRole.MEMBER

    @field_validator("password")
    @classmethod
    def validate_password_length(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be 72 bytes or fewer.")
        return value


class UserOut(UserBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
