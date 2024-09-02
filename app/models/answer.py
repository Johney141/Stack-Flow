from .db import db, environment, SCHEMA, add_prefix_for_prod


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # Add Foreign Key for questions once table is created
    # db.ForeignKey("questions.id")
    question_id = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="answers")
    # question = db.relationship("Question", back_populates="answers")

