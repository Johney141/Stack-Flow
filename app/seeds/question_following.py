from app.models import db, QuestionFollowing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_question_followings():

  q_demo = QuestionFollowing(user_id=1, question_id=1)
  q_demo1 = QuestionFollowing(user_id=1, question_id=2)
  q_demo2 = QuestionFollowing(user_id=1, question_id=3)
  q_demo3 = QuestionFollowing(user_id=2, question_id=2)
  q_demo4 = QuestionFollowing(user_id=3, question_id=3)
  q_demo5 = QuestionFollowing(user_id=3, question_id=1)
  q_demo6 = QuestionFollowing(user_id=2, question_id=1)

  db.session.add(q_demo)
  db.session.add(q_demo1)
  db.session.add(q_demo2)
  db.session.add(q_demo3)
  db.session.add(q_demo4)
  db.session.add(q_demo5)
  db.session.add(q_demo6)
  db.session.commit()


def undo_question_followings():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.question_following RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM question_following"))

  db.session.commit()
