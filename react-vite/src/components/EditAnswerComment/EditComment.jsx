import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEditComment } from '../../redux/answers';
import { getAllQuestionsThunk } from "../../redux/questions";
import { useModal } from '../../context/Modal';
import './EditComment.css'

const EditAnswerCommentModal = ({ commentId, oldComment }) => {
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
      return dispatch(getAllQuestionsThunk()) // Prefer refreshing only the answer's store
        .then(closeModal);                    // but QuestionDetail's answer object is from ALL QUESTIONS
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {errors.message && (
          <p className='error'>{errors.message}</p>
        )}
        <label>
          <input style={{height: 100, width: 300}}
            type="text"
            placeholder="Edit comment"
            defaultValue={oldComment}
            onChange={handleComment}
          />
        </label>
        <div style={{textAlign: 'center'}}>
          <button className='post-comment' disabled={comment.length < 3} type="submit">Edit Comment</button>
        </div>
      </form>
    </>
  );
}

export default EditAnswerCommentModal;
