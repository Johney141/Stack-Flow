"""create answer_upvote table

Revision ID: 76bcb5bfddfe
Revises: aaad0beb4371
Create Date: 2024-09-08 19:30:24.521243

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
# revision identifiers, used by Alembic.
revision = '76bcb5bfddfe'
down_revision = 'aaad0beb4371'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('answer_upvote',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('answer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('user_id', 'answer_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE answer_upvote SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('answer_upvote')
    # ### end Alembic commands ###
