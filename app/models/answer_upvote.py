from .db import db, environment, SCHEMA, add_prefix_for_prod


class AnswerUpvote(db.Model):
  __tablename__ = 'answer_upvote'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), primary_key=True, nullable=True)
  answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id'), ondelete='SET NULL'), primary_key=True, nullable=True)

  user = db.relationship("User", back_populates="answer_upvote")
  answer = db.relationship("Answer", back_populates="answer_upvote")

  def to_dict(self):
    return {
      'userId': self.user_id,
      'answerId': self.answer_id
    }
