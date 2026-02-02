import argparse
from datetime import date, datetime, timedelta

from app.db.session import SessionLocal
from app.models.announcement import Announcement
from app.models.event import Event
from app.models.livestream import LivestreamConfig
from app.models.media import MediaAsset
from app.models.sermon import Sermon
from app.models.site_content import SiteContent


def seed_site_content(db, media_ids, force=False):
    content = db.query(SiteContent).first()
    if not content:
        content = SiteContent()
        db.add(content)
        db.flush()

    fields = [
        "hero_media_id",
        "about_media_id",
        "ministries_media_id",
        "contact_media_id",
    ]
    existing = any(getattr(content, field) for field in fields)
    if existing and not force:
        return content

    assignments = {
        "hero_media_id": media_ids[0] if len(media_ids) > 0 else None,
        "about_media_id": media_ids[1] if len(media_ids) > 1 else None,
        "ministries_media_id": media_ids[2] if len(media_ids) > 2 else None,
        "contact_media_id": media_ids[3] if len(media_ids) > 3 else None,
    }

    for key, value in assignments.items():
        if value or force:
            setattr(content, key, value)
    content.updated_at = datetime.utcnow()
    return content


def seed_sermons(db, media_ids, force=False):
    if db.query(Sermon).count() > 0 and not force:
        return []

    today = date.today()
    sermons = [
        Sermon(
            title="Anchored in Hope",
            speaker="Ps. Daniel Asante",
            sermon_date=today - timedelta(days=7),
            scripture="Hebrews 6:19",
            description="A call to trust God in every season.",
            video_url=None,
            audio_url=None,
            thumbnail_media_id=media_ids[4] if len(media_ids) > 4 else None,
        ),
        Sermon(
            title="Walking in the Spirit",
            speaker="Ps. Grace Owusu",
            sermon_date=today - timedelta(days=14),
            scripture="Galatians 5:25",
            description="Living a Spirit-led life daily.",
            video_url=None,
            audio_url=None,
            thumbnail_media_id=media_ids[5] if len(media_ids) > 5 else None,
        ),
        Sermon(
            title="Faith for the Journey",
            speaker="Ps. Michael Boateng",
            sermon_date=today - timedelta(days=21),
            scripture="2 Corinthians 5:7",
            description="Trusting God step by step.",
            video_url=None,
            audio_url=None,
            thumbnail_media_id=media_ids[6] if len(media_ids) > 6 else None,
        ),
    ]
    db.add_all(sermons)
    return sermons


def seed_events(db, media_ids, force=False):
    if db.query(Event).count() > 0 and not force:
        return []

    now = datetime.utcnow()
    events = [
        Event(
            title="Sunday Worship Experience",
            description="Join us for worship and the Word.",
            location="Oyarifa Worship Center",
            start_time=now + timedelta(days=3),
            end_time=now + timedelta(days=3, hours=2),
            cover_image_id=media_ids[7] if len(media_ids) > 7 else None,
            is_public=True,
        ),
        Event(
            title="Midweek Prayer Service",
            description="Corporate prayer and encouragement.",
            location="Oyarifa Worship Center",
            start_time=now + timedelta(days=6),
            end_time=now + timedelta(days=6, hours=2),
            cover_image_id=media_ids[8] if len(media_ids) > 8 else None,
            is_public=True,
        ),
        Event(
            title="Community Outreach",
            description="Serving our neighbors with love.",
            location="Community Grounds",
            start_time=now + timedelta(days=10),
            end_time=now + timedelta(days=10, hours=3),
            cover_image_id=media_ids[9] if len(media_ids) > 9 else None,
            is_public=True,
        ),
    ]
    db.add_all(events)
    return events


def seed_announcements(db, force=False):
    if db.query(Announcement).count() > 0 and not force:
        return []

    today = date.today()
    announcements = [
        Announcement(
            title="Welcome to Worship",
            body="We are glad you are here. Join a small group this week.",
            start_date=today,
            end_date=today + timedelta(days=14),
            is_active=True,
        ),
        Announcement(
            title="Baptism Sunday",
            body="Register to be baptized during next month’s service.",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=21),
            is_active=True,
        ),
    ]
    db.add_all(announcements)
    return announcements


def seed_livestream(db, media_ids, force=False):
    existing = db.query(LivestreamConfig).first()
    if existing and not force:
        return existing

    if not existing:
        existing = LivestreamConfig(embed_url="", is_live=False)
        db.add(existing)
        db.flush()

    if not existing.schedule_text or force:
        existing.schedule_text = "Sundays 9:00 AM & 11:00 AM"
    if not existing.cover_image_id and len(media_ids) > 3:
        existing.cover_image_id = media_ids[3]
    existing.updated_at = datetime.utcnow()
    return existing


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Overwrite existing content")
    args = parser.parse_args()

    db = SessionLocal()
    try:
        media = db.query(MediaAsset).order_by(MediaAsset.uploaded_at.desc()).all()
        media_ids = [item.id for item in media]

        site_content = seed_site_content(db, media_ids, force=args.force)
        sermons = seed_sermons(db, media_ids, force=args.force)
        events = seed_events(db, media_ids, force=args.force)
        announcements = seed_announcements(db, force=args.force)
        livestream = seed_livestream(db, media_ids, force=args.force)

        if site_content.featured_sermon_id is None and sermons:
            site_content.featured_sermon_id = sermons[0].id
        if site_content.featured_event_id is None and events:
            site_content.featured_event_id = events[0].id
        site_content.updated_at = datetime.utcnow()

        db.commit()

        print("Seed complete")
        print(f"Media assets: {len(media_ids)}")
        print(f"Sermons created: {len(sermons)}")
        print(f"Events created: {len(events)}")
        print(f"Announcements created: {len(announcements)}")
        print(f"Site content id: {site_content.id if site_content else 'none'}")
        print(f"Livestream id: {livestream.id if livestream else 'none'}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
