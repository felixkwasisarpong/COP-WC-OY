"""add site content

Revision ID: 0002_site_content
Revises: 0001_initial
Create Date: 2026-02-02 00:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "0002_site_content"
down_revision: Union[str, None] = "0001_initial"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "site_content",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("hero_media_id", sa.Integer(), nullable=True),
        sa.Column("featured_sermon_id", sa.Integer(), nullable=True),
        sa.Column("featured_event_id", sa.Integer(), nullable=True),
        sa.Column("about_media_id", sa.Integer(), nullable=True),
        sa.Column("ministries_media_id", sa.Integer(), nullable=True),
        sa.Column("contact_media_id", sa.Integer(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["hero_media_id"], ["media_assets.id"]),
        sa.ForeignKeyConstraint(["featured_sermon_id"], ["sermons.id"]),
        sa.ForeignKeyConstraint(["featured_event_id"], ["events.id"]),
        sa.ForeignKeyConstraint(["about_media_id"], ["media_assets.id"]),
        sa.ForeignKeyConstraint(["ministries_media_id"], ["media_assets.id"]),
        sa.ForeignKeyConstraint(["contact_media_id"], ["media_assets.id"]),
    )
    op.create_index("ix_site_content_id", "site_content", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_site_content_id", table_name="site_content")
    op.drop_table("site_content")
