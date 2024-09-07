from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Answer, User, AnswerComment, db
from app.forms import AnswerForm, AnswerCommentForm

answer_routes = Blueprint('answers', __name__)

# Get current user's answers
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
        return jsonify({"message": "Answer couldn't be found"}), 404
    
    # if not authorized
    if answer.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to udpate answer"}), 403

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
        return jsonify(res)
    else: 
        return form.errors, 401
    

# Delete a answer
@answer_routes.route('/<int:answer_id>', methods=['DELETE'])
@login_required
def delete_answer(answer_id): 
    answer = Answer.query.get(answer_id)
    # If answer does not exist
    if not answer:
        return jsonify({"error": "Answer couldn't be found"}), 404 
    # If unauthorized
    if answer.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete answer"}), 403
    
    db.session.delete(answer)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})


# Get Current user's answer comments
@answer_routes.route('/comments/current')
@login_required
def answer_comments():
    comments = AnswerComment.query.join(User).filter(AnswerComment.user_id == current_user.id).all()
    

    comments_res = { 'AnswerComments': [
        {
            'id': comment.id,
            'userId': comment.user_id,
            'answerId': comment.answer_id,
            'comment': comment.comment,
            'User': {
                'id': comment.user.id,
                'username': comment.user.username,
                'email': comment.user.email
            }
        } for comment in comments]
    }
    
    return jsonify(comments_res)


# Create a answer comment
@answer_routes.route('/<int:answer_id>/comments', methods=['POST'])
@login_required
def create_comment(answer_id):
    # Check if answer exists
    answer = Answer.query.get(answer_id)
    if not answer:
        return jsonify({"error": "Answer couldn't be found"}), 404
    
    # Create Answer
    form = AnswerCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = AnswerComment(
            user_id=current_user.id,
            answer_id=answer_id,
            comment=form.data['comment']
        )

        db.session.add(comment)
        db.session.commit()
        res = {
            "id": comment.id,
            "userId": comment.user_id,
            "answerId": comment.answer_id,
            "comment": comment.comment          
        }
        return jsonify(res), 201
    else: 
        return form.errors, 401
    
# Update a answer comment
@answer_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = AnswerComment.query.get(comment_id)
    # Check if comment exists
    if not comment:
        return jsonify({"error": "Answer Comment couldn't be found"}), 404
    
    # Check if authorized
    if comment.user_id != current_user.id: 
        return jsonify({"error": "Not Authorized to udpate answer"}), 403
    
    form = AnswerCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.data['comment']

        db.session.commit()

        res = {
            "id": comment.id,
            "userId": comment.user_id,
            "answerId": comment.answer_id,
            "comment": comment.comment          
        }
        return jsonify(res), 201
    else: 
        return form.errors, 401
    

@answer_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = AnswerComment.query.get(comment_id)

    # Check if comment exists
    if not comment:
        return jsonify({"error": "Answer Comment couldn't be found"}), 404
    
    # Check if authorized
    if comment.user_id != current_user.id: 
        return jsonify({"error": "Not Authorized to delete answer"}), 403
    
    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})