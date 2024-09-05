from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Answer, User, db
from app.forms import AnswerForm

answer_routes = Blueprint('answers', __name__)

# Get current users answers
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


# Update a answer
@answer_routes.route('/<int:answer_id>', methods=['PUT'])
@login_required
def update_answer(answer_id):
    answer = Answer.query.get(answer_id)
    # If answer doesn't exist
    if not answer:
        return jsonify({"error": "Answer not found"})
    
    # if not authorized
    if answer.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to udpate answer"})

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer.answer = form.data['answer']

        db.session.commit()

        res = {
            "id": answer.id,
            "userId": answer.id,
            "questionId": answer.question_id,
            "answer": answer.answer
        }
        return jsonify(res), 201
    else: 
        return form.errors, 401

    

