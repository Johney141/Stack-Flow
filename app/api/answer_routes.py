from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Answer, User

answer_routes = Blueprint('answers', __name__)


@answer_routes.route('/current')
@login_required
def user_answers():
    answers = Answer.query.join(User).filter(Answer.user_id == current_user.id).all()


    answer_res = { 'Answers': [
        {
            'id': answer.id,
            'userId': answer.user_id,
            'questionId': answer.question_id,
            'answer': answer.answer,
            'User': {
                'id': answer.user.id,
                'username': answer.user.username,
                'email': answer.user.email
            }
        } for answer in answers]
    }
    
    return jsonify(answer_res)
    

    

