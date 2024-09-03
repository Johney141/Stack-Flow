from .db import db, environment, SCHEMA

class QuestionTag(db.Model):
  __tablename__ = 'question_tags'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

  question = db.relationship('Question', back_populates="question_tags")
  tag = db.relationship('Tag', back_populates="question_tags")
