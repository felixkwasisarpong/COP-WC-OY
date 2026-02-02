#!/usr/bin/env sh
set -e

echo "Waiting for database..."
python - <<'PY'
import time
from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True)
for _ in range(30):
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        break
    except Exception:
        time.sleep(1)
else:
    raise SystemExit("Database not ready")
PY

echo "Running migrations..."
alembic upgrade head

echo "Starting server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
