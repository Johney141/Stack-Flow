from app.models import db, QuestionComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_question_comments():
  q_demo = QuestionComment(
    comment='Have you done a git pull?', user_id=1, question_id=2
  )
  q_demo2 = QuestionComment(
    comment='Smh I did not, everything is working now. Thanks', user_id=2, question_id=2
  )
  q_demo3 = QuestionComment(
    comment='Np', user_id=1, question_id=2
  )

  db.session.add(q_demo)
  db.session.add(q_demo2)
  db.session.add(q_demo3)
  db.session.commit()


def undo_question_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.question_comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM question_comments"))

  db.session.commit()
