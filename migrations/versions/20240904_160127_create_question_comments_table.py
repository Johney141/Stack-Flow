"""create question_comments table

Revision ID: aaad0beb4371
Revises: 06433e20b0e0
Create Date: 2024-09-04 16:01:27.081597

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
# revision identifiers, used by Alembic.
revision = 'aaad0beb4371'
down_revision = '06433e20b0e0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('question_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE question_comments SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('question_comments')
