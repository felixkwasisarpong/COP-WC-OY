from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole
    is_active: bool


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole = UserRole.MEMBER


class UserOut(UserBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
