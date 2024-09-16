import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEditComment, fetchComments } from "../../redux/questions";
import { useModal } from '../../context/Modal';
import './EditComment.css'

const EditQuestionCommentModal = ({ commentId, oldComment, questionId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleComment = (e) => setComment(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const response = await dispatch(fetchEditComment({comment: comment, commentId}))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) {
          setErrors(data);
        }
      }
    );
    if(response) {
      return dispatch(fetchComments(questionId))
        .then(closeModal);
    }
  }
  return (
    <div className='modal'>
      <form onSubmit={handleSubmit}>
        {errors.message && (
          <p className='error'>{errors.message}</p>
        )}
        <label>
          <input style={{height: 100, width: 300}}
            type="text"
            placeholder="Comment must be at least 3 characters long"
            defaultValue={oldComment}
            onChange={handleComment}
          />
        </label>
        <div style={{textAlign: 'center'}}>
          <button className='md-button' disabled={comment.length < 3} type="submit">Edit Comment</button>
        </div>
      </form>
    </div>
  );
}

export default EditQuestionCommentModal;
