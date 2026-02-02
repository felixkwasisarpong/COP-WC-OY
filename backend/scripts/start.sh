#!/usr/bin/env sh
set -e

echo "Waiting for database..."
python - <<'PY'
import time
from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True)
last_error = None
for _ in range(60):
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        last_error = None
        break
    except Exception as exc:
        last_error = exc
        time.sleep(1)
if last_error:
    raise SystemExit(f"Database not ready: {last_error}")
PY

echo "Running migrations..."
alembic upgrade head

echo "Ensuring admin user..."
python - <<'PY'
import os
from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash

email = os.environ.get("ADMIN_EMAIL")
password = os.environ.get("ADMIN_PASSWORD")

if email and password:
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.role == UserRole.ADMIN).first()
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            if existing.role != UserRole.ADMIN:
                existing.role = UserRole.ADMIN
                db.commit()
            print("Admin user already exists, skipping.")
        elif admin:
            print("Admin role already present, skipping bootstrap user.")
        else:
            user = User(
                email=email,
                hashed_password=get_password_hash(password),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(user)
            db.commit()
            print("Admin user created.")
    finally:
        db.close()
else:
    print("ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin bootstrap.")
PY

echo "Starting server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
