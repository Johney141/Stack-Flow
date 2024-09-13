from .db import db, environment, SCHEMA, add_prefix_for_prod


class QuestionComment(db.Model):
    __tablename__ = 'question_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)

    user = db.relationship('User', back_populates="question_comments")
    question = db.relationship('Question', back_populates="question_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'question_id': self.question_id
            }
