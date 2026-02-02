"""initial schema

Revision ID: 0001_initial
Revises: 
Create Date: 2026-02-02 00:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.Enum("member", "admin", name="userrole"), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "media_assets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("filename", sa.String(length=500), nullable=False),
        sa.Column("content_type", sa.String(length=100), nullable=False),
        sa.Column("size_bytes", sa.Integer(), nullable=False),
        sa.Column("storage_key", sa.String(length=500), nullable=False),
        sa.Column("uploaded_at", sa.DateTime(), nullable=False),
        sa.Column("uploaded_by_id", sa.Integer(), nullable=True),
        sa.Column("is_public", sa.Boolean(), nullable=False),
        sa.Column("downloads_enabled", sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(["uploaded_by_id"], ["users.id"]),
    )
    op.create_index("ix_media_assets_id", "media_assets", ["id"], unique=False)

    op.create_table(
        "sermons",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("speaker", sa.String(length=255), nullable=False),
        sa.Column("sermon_date", sa.Date(), nullable=False),
        sa.Column("scripture", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("video_url", sa.String(length=500), nullable=True),
        sa.Column("audio_url", sa.String(length=500), nullable=True),
        sa.Column("thumbnail_media_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["thumbnail_media_id"], ["media_assets.id"]),
    )
    op.create_index("ix_sermons_id", "sermons", ["id"], unique=False)

    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("location", sa.String(length=255), nullable=False),
        sa.Column("start_time", sa.DateTime(), nullable=False),
        sa.Column("end_time", sa.DateTime(), nullable=True),
        sa.Column("cover_image_id", sa.Integer(), nullable=True),
        sa.Column("is_public", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["cover_image_id"], ["media_assets.id"]),
    )
    op.create_index("ix_events_id", "events", ["id"], unique=False)

    op.create_table(
        "event_media",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("event_id", sa.Integer(), nullable=False),
        sa.Column("media_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["event_id"], ["events.id"]),
        sa.ForeignKeyConstraint(["media_id"], ["media_assets.id"]),
    )
    op.create_index("ix_event_media_id", "event_media", ["id"], unique=False)

    op.create_table(
        "announcements",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=True),
        sa.Column("end_date", sa.Date(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_announcements_id", "announcements", ["id"], unique=False)

    op.create_table(
        "livestream_configs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("embed_url", sa.String(length=500), nullable=False),
        sa.Column("is_live", sa.Boolean(), nullable=False),
        sa.Column("schedule_text", sa.String(length=255), nullable=True),
        sa.Column("cover_image_id", sa.Integer(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["cover_image_id"], ["media_assets.id"]),
    )
    op.create_index("ix_livestream_configs_id", "livestream_configs", ["id"], unique=False)



def downgrade() -> None:
    op.drop_index("ix_livestream_configs_id", table_name="livestream_configs")
    op.drop_table("livestream_configs")
    op.drop_index("ix_announcements_id", table_name="announcements")
    op.drop_table("announcements")
    op.drop_index("ix_event_media_id", table_name="event_media")
    op.drop_table("event_media")
    op.drop_index("ix_events_id", table_name="events")
    op.drop_table("events")
    op.drop_index("ix_sermons_id", table_name="sermons")
    op.drop_table("sermons")
    op.drop_index("ix_media_assets_id", table_name="media_assets")
    op.drop_table("media_assets")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")
    op.execute("DROP TYPE userrole")
