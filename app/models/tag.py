from .db import db, environment, SCHEMA

class Tag(db.Model):
  __tablename__ = 'tags'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  tag_name = db.Column(db.String(20), nullable=False)

  question_tags = db.relationship('QuestionTag', back_populates='tag')
