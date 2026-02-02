# COP-WC-OY Church Platform

Production-grade, Dockerized church website with a modern, welcoming frontend and a secure FastAPI backend. The system supports public church information, sermons, livestreams, events, ministries, online giving, authentication, admin content management, and media management.

## Tech Stack
- Frontend: React 18, TypeScript, Next.js (App Router), Tailwind CSS, TanStack React Query
- Backend: FastAPI, Python 3.11+, Pydantic v2, SQLAlchemy, PostgreSQL, JWT auth, Alembic
- Infra: Docker + Docker Compose

## Getting Started
1. Copy environment variables:
   - `cp .env.example .env`
2. Start the stack:
   - `docker compose up --build`

## Services
- Frontend: `http://localhost:${FRONTEND_PORT}`
- Backend API: `http://localhost:${BACKEND_PORT}/api/v1`
- API Docs: `http://localhost:${BACKEND_PORT}/docs`

## Environment Variables (root `.env`)
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`
- `DATABASE_URL`
- `JWT_SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`
- `CORS_ORIGINS`, `MEDIA_ROOT`
- `NEXT_PUBLIC_API_URL`, `BACKEND_PORT`, `FRONTEND_PORT`

## Project Structure
```
backend/
  app/
    api/
    core/
    db/
    models/
    schemas/
    services/
    storage/
  alembic/
  tests/
frontend/
  src/
    app/
    components/
    hooks/
    layouts/
    services/
  public/
```

## Notes
- Media files are stored locally via an abstraction layer and can be swapped to S3 later.
- Livestreams are embedded only (YouTube/Vimeo). No custom streaming infrastructure.
- Payment endpoints are stubbed for Stripe/PayPal integration.

## Admin Bootstrap
- Create a member via `POST /api/v1/auth/register`.
- Promote to admin by updating the `users.role` in the database for the first admin account.
- Subsequent admins can be created via `POST /api/v1/auth/admin` (admin-only).
