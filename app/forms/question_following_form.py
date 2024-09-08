from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Question


def question_exists(form, field):
    id = field.data
    question = Question.query.get(id)
    if not question:
        raise ValidationError('This question does not exist.')

class QuestionFollowingForm(FlaskForm):
    question_id = IntegerField(
        'Question Id', validators=[DataRequired(), question_exists])
