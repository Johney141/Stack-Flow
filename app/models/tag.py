from .db import db, environment, SCHEMA
from .question_tag import QuestionTag

class Tag(db.Model):
  __tablename__ = 'tags'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  tag_name = db.Column(db.String(20), nullable=False)

  questions = db.relationship('Question', secondary=QuestionTag, backref='Tag')
