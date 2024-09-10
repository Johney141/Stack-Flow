from app.models import db, Tag, QuestionTag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
  tag1 = Tag(tag_name='javascript') # for question 1
  tag2 = Tag(tag_name='python') # for question 2
  tag3 = Tag(tag_name='sqlalchemy') # for question 2, 3
  tag4 = Tag(tag_name='docker') # for question 3

  questiontag1 = QuestionTag(question_id=1, tag_id=1)
  questiontag2 = QuestionTag(question_id=2, tag_id=2)
  questiontag3 = QuestionTag(question_id=2, tag_id=3)
  questiontag4 = QuestionTag(question_id=3, tag_id=4)
  questiontag5 = QuestionTag(question_id=3, tag_id=3)

  db.session.add(tag1)
  db.session.add(tag2)
  db.session.add(tag3)
  db.session.add(tag4)
  db.session.add(questiontag1)
  db.session.add(questiontag2)
  db.session.add(questiontag3)
  db.session.add(questiontag4)
  db.session.add(questiontag5)
  db.session.commit()


def undo_tags():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.question_tags RESTART IDENTITY CASCADE;")
    db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM question_tags"))
    db.session.execute(text("DELETE FROM tags"))

  db.session.commit()
