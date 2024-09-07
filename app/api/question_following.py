from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import QuestionFollowing, User

question_following_routes = Blueprint('questions_following', __name__)

@question_following_routes('/current')
@login_required
def questions_followed():
    followed_questions = QuestionFollowing.query.joun
