"""empty message

Revision ID: eeebf985ed9b
Revises: 28b402342657
Create Date: 2024-03-15 22:32:06.295992

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eeebf985ed9b'
down_revision = '28b402342657'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('saved_items', schema=None) as batch_op:
        batch_op.alter_column('release_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('saved_items', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('release_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###