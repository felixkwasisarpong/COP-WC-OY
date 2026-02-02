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


def seed_sermons(db, media_ids, force=False, count=6):
    if force:
        db.query(Sermon).delete()
        db.flush()

    existing = db.query(Sermon).count()
    needed = max(0, count - existing)
    if needed == 0:
        return []

    today = date.today()
    templates = [
        ("Anchored in Hope", "Ps. Daniel Asante", "Hebrews 6:19", "A call to trust God in every season."),
        ("Walking in the Spirit", "Ps. Grace Owusu", "Galatians 5:25", "Living a Spirit-led life daily."),
        ("Faith for the Journey", "Ps. Michael Boateng", "2 Corinthians 5:7", "Trusting God step by step."),
        ("Grace That Sustains", "Ps. Lydia Mensah", "2 Corinthians 12:9", "Depending on grace every day."),
        ("Kingdom Builders", "Ps. Joshua Kusi", "Matthew 6:33", "Seeking God's kingdom first."),
        ("Victory in Prayer", "Ps. Esther Bediako", "Philippians 4:6", "A life shaped by prayer."),
    ]

    sermons = []
    for i in range(needed):
        title, speaker, scripture, description = templates[i % len(templates)]
        media_id = media_ids[(i + 4) % len(media_ids)] if media_ids else None
        sermons.append(
            Sermon(
                title=title,
                speaker=speaker,
                sermon_date=today - timedelta(days=7 * (i + 1)),
                scripture=scripture,
                description=description,
                video_url=None,
                audio_url=None,
                thumbnail_media_id=media_id,
            )
        )
    db.add_all(sermons)
    db.flush()
    return sermons


def seed_events(db, media_ids, force=False, count=6):
    if force:
        db.query(Event).delete()
        db.flush()

    existing = db.query(Event).count()
    needed = max(0, count - existing)
    if needed == 0:
        return []

    now = datetime.utcnow()
    templates = [
        ("Sunday Worship Experience", "Join us for worship and the Word.", "Oyarifa Worship Center"),
        ("Midweek Prayer Service", "Corporate prayer and encouragement.", "Oyarifa Worship Center"),
        ("Community Outreach", "Serving our neighbors with love.", "Community Grounds"),
        ("Youth Encounter", "A gathering for students and young adults.", "Oyarifa Worship Center"),
        ("Women of Grace", "Encouragement and fellowship for women.", "Oyarifa Worship Center"),
        ("Men of Valor", "Brotherhood, discipleship, and worship.", "Oyarifa Worship Center"),
    ]

    events = []
    for i in range(needed):
        title, description, location = templates[i % len(templates)]
        media_id = media_ids[(i + 1) % len(media_ids)] if media_ids else None
        start = now + timedelta(days=3 + i * 3)
        events.append(
            Event(
                title=title,
                description=description,
                location=location,
                start_time=start,
                end_time=start + timedelta(hours=2),
                cover_image_id=media_id,
                is_public=True,
            )
        )
    db.add_all(events)
    db.flush()
    return events


def seed_announcements(db, force=False, count=4):
    if force:
        db.query(Announcement).delete()
        db.flush()

    existing = db.query(Announcement).count()
    needed = max(0, count - existing)
    if needed == 0:
        return []

    today = date.today()
    templates = [
        ("Welcome to Worship", "We are glad you are here. Join a small group this week."),
        ("Baptism Sunday", "Register to be baptized during next month’s service."),
        ("Volunteer Training", "Sign up for the next serve team onboarding."),
        ("Prayer Week", "Join us for a week of focused prayer and fasting."),
    ]

    announcements = []
    for i in range(needed):
        title, body = templates[i % len(templates)]
        announcements.append(
            Announcement(
                title=title,
                body=body,
                start_date=today + timedelta(days=i * 7),
                end_date=today + timedelta(days=i * 7 + 14),
                is_active=True,
            )
        )
    db.add_all(announcements)
    db.flush()
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
        sermons = seed_sermons(db, media_ids, force=args.force, count=6)
        events = seed_events(db, media_ids, force=args.force, count=6)
        announcements = seed_announcements(db, force=args.force, count=4)
        livestream = seed_livestream(db, media_ids, force=args.force)

        if site_content.featured_sermon_id is None:
            sermon_pick = sermons[0] if sermons else db.query(Sermon).first()
            if sermon_pick:
                site_content.featured_sermon_id = sermon_pick.id
        if site_content.featured_event_id is None:
            event_pick = events[0] if events else db.query(Event).first()
            if event_pick:
                site_content.featured_event_id = event_pick.id
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
