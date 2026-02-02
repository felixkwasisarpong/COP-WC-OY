from fastapi import APIRouter

from app.api.routes import health, auth, sermons, events, announcements, media, livestream, giving

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(sermons.router, prefix="/sermons", tags=["sermons"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(announcements.router, prefix="/announcements", tags=["announcements"])
api_router.include_router(media.router, prefix="/media", tags=["media"])
api_router.include_router(livestream.router, prefix="/livestream", tags=["livestream"])
api_router.include_router(giving.router, prefix="/giving", tags=["giving"])
