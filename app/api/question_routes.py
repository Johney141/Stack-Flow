from flask import Blueprint, request, jsonify
from app.models import Question, Answer, Tag, QuestionTag, QuestionComment, User, db
from app.forms import AnswerForm, QuestionCommentForm
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

# Get Current user's question comments
@question_routes.route('/comments/current')
@login_required
def question_comments():
    comments = QuestionComment.query.join(User).filter(QuestionComment.user_id == current_user.id).all()


    comments_res = { 'QuestionComments': [
        {
            'id': comment.id,
            'userId': comment.user_id,
            'questionId': comment.question_id,
            'comment': comment.comment,
            'User': {
                'id': comment.user.id,
                'username': comment.user.username,
                'email': comment.user.email
            }
        } for comment in comments]
    }

    return jsonify(comments_res)

# Create a question comment
@question_routes.route('/<int:question_id>/comments', methods=['POST'])
@login_required
def create_comment(question_id):
    # Check if question exists
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question couldn't be found"}), 404

    # Create Question
    form = QuestionCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = QuestionComment(
            user_id=current_user.id,
            question_id=question_id,
            comment=form.data['comment']
        )

        db.session.add(comment)
        db.session.commit()
        res = {
            "id": comment.id,
            "userId": comment.user_id,
            "questionId": comment.question_id,
            "comment": comment.comment
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

# Update a question comment
@question_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = QuestionComment.query.get(comment_id)
    # Check if comment exists
    if not comment:
        return jsonify({"error": "Comment couldn't be found"}), 404

    # Check if authorized
    if comment.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to update comment"}), 403

    form = QuestionCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.data['comment']

        db.session.commit()

        res = {
            "id": comment.id,
            "userId": comment.user_id,
            "questionId": comment.question_id,
            "comment": comment.comment
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

##Delete a question comment
@question_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = QuestionComment.query.get(comment_id)

    # Check if comment exists
    if not comment:
        return jsonify({"error": "Comment couldn't be found"}), 404

    # Check if authorized
    if comment.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})
