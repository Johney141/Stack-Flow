import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as questionActions from '../../redux/questions'
import './PostQuestionComment.css';


const PostQuestionCommentModal= ({questionId}) => {
    const { closeModal } = useModal();
      const dispatch = useDispatch();
      const [comment, setComment] = useState("")


      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(questionActions.createComment(questionId, {comment: comment}))
            .then(() => {
                dispatch(questionActions.fetchComments(questionId))
            })
            .then(() => {
                closeModal()
            })
    }

      return (
        <div className='modal'>
          <form onSubmit={handleSubmit}>
            <label>
              <input style={{height: 100, width: 300}}
                type="text"
                placeholder="Comment must be at least 3 characters long"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <div style={{textAlign:'center'}}>
            <button className='md-button' disabled={comment.length < 3}type="submit">Add a Comment</button>
            </div>
          </form>
        </div>
      );
  }

  export default PostQuestionCommentModal;
