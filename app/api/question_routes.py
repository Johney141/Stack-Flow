from flask import Blueprint, request, jsonify
from app.models import Question, Answer, db
from app.forms import AnswerForm
from flask_login import current_user, login_required


question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def index():
    # keep sample simple with just a link to the form
    return 'Could it be, the first page?'

# Create Answer Route
@question_routes.route('/<int:question_id>/answers', methods=['POST'])
@login_required
def create_answer(question_id):
    # Check to see if question exists
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404
    
    # Check to see if user has already answered
    existing_answer = Answer.query.filter_by(question_id=question_id, user_id=current_user.id).first()
    if existing_answer:
        return jsonify({"error": "User already has a answer for question"}), 400
    
    # Create Answer
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer = Answer(
            user_id=current_user.id,
            question_id=question_id,
            answer=form.data['answer']
        )
        db.session.add(answer)
        db.session.commit()
        res = {
            "id": answer.id,
            "userId": current_user.id,
            "questionId": answer.question_id,
            "answer": answer.answer
        }
        return jsonify(res), 201
    else: 
        return form.errors, 401
