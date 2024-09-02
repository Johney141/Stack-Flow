from .db import db, environment, SCHEMA


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