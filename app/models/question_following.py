from .db import db, environment, SCHEMA, add_prefix_for_prod


class QuestionFollowing(db.Model):
    __tablename__ = 'question_following'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), primary_key=True, nullable=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id'), ondelete='SET NULL'), primary_key=True, nullable=True)

    # many to one with User
    user = db.relationship("User", back_populates="question_following")
    # many to one with Product
    question = db.relationship("Question", back_populates="question_following")

    def to_dict(self):
        return {
            'userId': self.user_id,
            'questionId': self.question_id
        }
