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

echo "Starting server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
