from .db import db, environment, SCHEMA, add_prefix_for_prod


class QuestionComment(db.Model):
    __tablename__ = 'question_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)

    user = db.relationship('User', back_populates="question_comments")
    question = db.relationship('Question', back_populates="question_comments")
