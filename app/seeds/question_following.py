from app.models import db, QuestionFollowing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_question_followings():

  qDemo = QuestionFollowing(user_id=1, question_id=1)
  qDemo1 = QuestionFollowing(user_id=1, question_id=2)
  qDemo2 = QuestionFollowing(user_id=1, question_id=3)
  qDemo3 = QuestionFollowing(user_id=2, question_id=2)
  qDemo4 = QuestionFollowing(user_id=3, question_id=3)
  qDemo5 = QuestionFollowing(user_id=3, question_id=1)
  qDemo6 = QuestionFollowing(user_id=2, question_id=1)

  db.session.add(qDemo)
  db.session.add(qDemo1)
  db.session.add(qDemo2)
  db.session.add(qDemo3)
  db.session.add(qDemo4)
  db.session.add(qDemo5)
  db.session.add(qDemo6)
  db.session.commit()


def undo_question_followings():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.question_followings RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM question_followings"))

  db.session.commit()
