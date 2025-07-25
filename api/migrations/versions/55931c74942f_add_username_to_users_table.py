"""Add username to users table

Revision ID: 55931c74942f
Revises: ad74c09d4297
Create Date: 2025-06-23 13:10:48.998643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55931c74942f'
down_revision = 'ad74c09d4297'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=80), nullable=False))
        batch_op.create_unique_constraint('uq_users_username', ['username'])


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('username')

    # ### end Alembic commands ###
