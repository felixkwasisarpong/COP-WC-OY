"""add social links to site content

Revision ID: 0003_social_links
Revises: 0002_site_content
Create Date: 2026-02-03
"""

from alembic import op
import sqlalchemy as sa


revision = "0003_social_links"
down_revision = "0002_site_content"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("site_content", sa.Column("social_facebook_url", sa.String(length=500), nullable=True))
    op.add_column("site_content", sa.Column("social_instagram_url", sa.String(length=500), nullable=True))
    op.add_column("site_content", sa.Column("social_youtube_url", sa.String(length=500), nullable=True))
    op.add_column("site_content", sa.Column("social_tiktok_url", sa.String(length=500), nullable=True))


def downgrade() -> None:
    op.drop_column("site_content", "social_tiktok_url")
    op.drop_column("site_content", "social_youtube_url")
    op.drop_column("site_content", "social_instagram_url")
    op.drop_column("site_content", "social_facebook_url")
