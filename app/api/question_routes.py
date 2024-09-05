from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Question, User
import sys

question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def all_questions():
    # keep sample simple with just a link to the form
    questions = Question.query.join(User)
    questions_res = [{
        'id': question.id,
        'question': question.question,
        'subject': question.subject,
        'User':{
            'userId': question.user.id,
            'username': question.user.username
        }
    } for question in questions]
    print(questions_res, file=sys.stderr)
    return questions_res
