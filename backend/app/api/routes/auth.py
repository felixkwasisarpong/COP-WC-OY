from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas.auth import Token, LoginRequest
from app.schemas.user import UserCreate, UserOut
from app.models.user import UserRole
from app.services.users import authenticate_user, create_user, get_user_by_email
from app.core.security import create_access_token

router = APIRouter()


@router.post("/register", response_model=UserOut, status_code=201)
def register_user(payload: UserCreate, db: Session = Depends(deps.get_db)) -> UserOut:
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, email=payload.email, password=payload.password)
    return user


@router.post("/admin", response_model=UserOut, status_code=201)
def create_admin_user(
    payload: UserCreate,
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> UserOut:
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, email=payload.email, password=payload.password, role=UserRole.ADMIN)
    return user


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(deps.get_db)) -> Token:
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = create_access_token(subject=user.email, role=user.role.value)
    return Token(access_token=access_token)


@router.get("/me", response_model=UserOut)
def read_users_me(current_user=Depends(deps.get_current_active_user)) -> UserOut:
    return current_user
