"""create question_following table

Revision ID: 06433e20b0e0
Revises: 882939f3779d
Create Date: 2024-09-03 15:11:08.875583

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
# revision identifiers, used by Alembic.
revision = '06433e20b0e0'
down_revision = '882939f3779d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('question_following',
    sa.Column('user_id', sa.Integer()),
    sa.Column('question_id', sa.Integer()),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('user_id', 'question_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE question_following SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('question_following')
