from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Question, Answer, User


class AnswerForm(FlaskForm):
    answer = StringField('answer', validators=[DataRequired()])