from .db import db, environment, SCHEMA
from .question_tag import QuestionTag
from .question_following import QuestionFollowing


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(5000), nullable=False)
    subject = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="answers")
    answers = db.relationship('Answer', back_populates='question')
    tags = db.relationship('Tag', secondary=QuestionTag, backref='Question')
    users = db.relationship("User", secondary=QuestionFollowing, back_populates="question")
