from flask import Blueprint, request, jsonify

from app.models import Question, Answer, db, User, QuestionComment, AnswerComment
from app.forms import QuestionForm, AnswerForm
from flask_login import current_user, login_required



question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def index():
    questions = Question.query.join(User).all()
    questions_res = { 'Questions': [
        {
            'id': question.id,
            'question': question.question,
            'subject': question.subject,
            'User': {
                'id': question.user.id,
                'username': question.user.username
            }
        } for question in questions]
    }

    return jsonify(questions_res)

# Refractor required
###########
# Get Question
@question_routes.route('/<int:id>')
def get_question(id):
    question_res = Question.query.get(id)

    if not question_res:
        return jsonify({"error": "Question couldn't be found"}), 404


# We're going to just do this one step at a time to get it done faster
# Get question
    question = {
        'id': question_res.id,
        'subject': question_res.subject,
        'question': question_res.question,
        'user_id': question_res.user_id
    }

    user_res = User.query.get(id)
    question["User"] = {'id':user_res.id, 'username':user_res.username}

    #########
    # Get question comments
    questionComment_res = QuestionComment.query.filter(QuestionComment.question_id == id).all()
    questionComments = []
    for row in questionComment_res:
        # Get user
        user_res = u = User.query.get(row.user_id)
        user_obj = {
            'id': u.id,
            'username': u.username
        }
        questionComments.append({
            'id': row.id,
            'comment': row.comment,
            'User': user_obj
        })

    question["QuestionComment"] = questionComments

    ################
    # Get Ansers
    answer_res = Answer.query.filter_by(question_id = id).join(AnswerComment)
    answers = []
    for row in answer_res:
        answer_dict = {
            'answer': row.answer,
            'id': row.id,
            'AnswerComments': []
        }
        for row in row.answer_comments:
            user_res = u = User.query.get(row.user_id)
            user_obj = {
                'id': u.id,
                'username': u.username
            }
            answer_dict["AnswerComments"].append({
                'comment': row.comment,
                'User': user_obj
            })
        answers.append(answer_dict)
    question["Answer"] = answers
        # answers.append()

    return jsonify(question)

#############
# Edit Question

@question_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_question(id):
    question = Question.query.get(id)
    # If answer doesn't exist
    if not question:
        return jsonify({"message": "Question couldn't be found"}), 404

    # if not authorized
    # if question.user_id != current_user.id:
    #     return jsonify({"error": "Not Authorized to udpate question"}), 403

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question.question = form.data['question']
        question.subject = form.data['subject']

        db.session.commit()

        res = {
            "id": question.id,
            "subject": question.subject,
            "question": question.question,
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

###############
# Delete Question
@question_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_question(id):
    question = Question.query.get(id)

    if not question:
        return jsonify({"error": "Question couldn't be found"}), 404

    # if question.user_id != current_user.id:
    #     return jsonify({"error": "Not Authorized to delete question"}), 403

    db.session.delete(question)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})

@question_routes.route('/', methods=["POST"])
@login_required
def create_question():

    # Create Answer
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question = Question(
            question=form.data['question'],
            subject=form.data['subject'],
            user_id=current_user.id
        )
        db.session.add(question)
        db.session.commit()
        res = {
            "id": question.id,
            "question": question.question,
            "subject": question.subject,
            "user_id": current_user.id
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

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

# Delete a Tag of a Question Based on the Question's id
@question_routes.route('/tags/<int:question_id>/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tag(question_id, tag_id):
  question = Question.query.get(question_id)
  tag = Tag.query.get(tag_id)
  if not question:
    return jsonify({"message": "Question couldn't be found"}), 404
  elif not tag:
    return jsonify({"message": "Tag couldn't be found"}), 404
  elif current_user.id != question.user.id:
    return jsonify({"message": "Unauthorized"}), 401

  questiontag = QuestionTag.query.filter_by(question_id=question_id, tag_id=tag_id).first()
  if not questiontag:
    return jsonify({"message": "Tag not associated with Question"}), 404
  else:
    db.session.delete(questiontag)
    db.session.commit()

    return jsonify({"message": "Successfully Removed"}), 200
