from app.models import db, AnswerUpvote, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answer_upvotes():
  a_upvote1 = AnswerUpvote(user_id=1, answer_id=1)
  a_upvote2 = AnswerUpvote(user_id=1, answer_id=2)
  a_upvote3 = AnswerUpvote(user_id=2, answer_id=2)
  a_upvote4 = AnswerUpvote(user_id=3, answer_id=2)

  db.session.add(a_upvote1)
  db.session.add(a_upvote2)
  db.session.add(a_upvote3)
  db.session.add(a_upvote4)
  db.session.commit()


def undo_answer_upvotes():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.answer_upvote RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM answer_upvote"))

  db.session.commit()
