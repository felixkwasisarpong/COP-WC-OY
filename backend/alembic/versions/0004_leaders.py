"""add leaders table

Revision ID: 0004_leaders
Revises: 0003_social_links
Create Date: 2026-02-03
"""

from alembic import op
import sqlalchemy as sa


revision = "0004_leaders"
down_revision = "0003_social_links"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "leaders",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=255), nullable=False),
        sa.Column("focus", sa.String(length=255), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("photo_media_id", sa.Integer(), sa.ForeignKey("media_assets.id"), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index(op.f("ix_leaders_id"), "leaders", ["id"])


def downgrade() -> None:
    op.drop_index(op.f("ix_leaders_id"), table_name="leaders")
    op.drop_table("leaders")
