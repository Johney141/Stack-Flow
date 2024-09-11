from .db import db, environment, SCHEMA, add_prefix_for_prod


class AnswerComment(db.Model):
    __tablename__ = 'answer_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("answers.id")), nullable=False)

    user = db.relationship('User', back_populates="answer_comments")
    answer = db.relationship('Answer', back_populates="answer_comments")
