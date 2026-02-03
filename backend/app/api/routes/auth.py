from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas.auth import Token, LoginRequest
from app.schemas.user import UserCreate, UserOut
from app.models.user import UserRole, User
from app.services.users import authenticate_user, create_user, get_user_by_email
from app.core.security import create_access_token
from app.core.config import settings

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


@router.post("/admin/bootstrap", response_model=UserOut, status_code=201)
def bootstrap_admin_user(
    payload: UserCreate,
    db: Session = Depends(deps.get_db),
    x_bootstrap_secret: str | None = Header(default=None, alias="X-Bootstrap-Secret"),
) -> UserOut:
    if not settings.bootstrap_admin_secret:
        raise HTTPException(status_code=403, detail="Bootstrap admin disabled")
    if not x_bootstrap_secret or x_bootstrap_secret != settings.bootstrap_admin_secret:
        raise HTTPException(status_code=403, detail="Invalid bootstrap secret")
    if not settings.bootstrap_admin_allow_multiple:
        existing_admin = db.query(User).filter(User.role == UserRole.ADMIN).first()
        if existing_admin:
            raise HTTPException(status_code=400, detail="Admin already exists")
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


@router.get("/admins", response_model=list[UserOut])
def list_admins(
    db: Session = Depends(deps.get_db),
    _: dict = Depends(deps.require_admin),
) -> list[UserOut]:
    return db.query(User).filter(User.role == UserRole.ADMIN).all()
