from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import QuestionFollowing, User, Question

question_following_routes = Blueprint('saved', __name__)

# Get all Followed Questions
@question_following_routes.route('/<int:user_id>')
@login_required
def questions_followed(user_id):
    questionfollowings = QuestionFollowing.query.filter(QuestionFollowing.user_id == user_id).all()


    questions_res = {
        'id': user_id,
        'Saved': [
        {
            'id': questionfollowing.question.id,
            'userId': questionfollowing.user_id,
            'subject': questionfollowing.subject,
            'question': questionfollowing.question,
            # 'User': {
            #     'id': question.user.id,
            #     'username': question.user.username,
            #     'email': question.user.email
            # }
        } for questionfollowing in questionfollowings]
    }

    return jsonify(questions_res)
