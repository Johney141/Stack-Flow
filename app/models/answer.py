from .db import db, environment, SCHEMA, add_prefix_for_prod


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(5000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)

    question = db.relationship('Question', back_populates='answers')
    user = db.relationship('User', back_populates='answers')
    answer_comments = db.relationship('AnswerComment', back_populates='answer')
