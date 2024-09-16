import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as answerActions from '../../redux/answers'
import * as questionActions from '../../redux/questions'
import './PostAnswerCommentModal.css'


const PostAnswerCommentModal = ({questionId, answerId}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(answerActions.createComment(answerId, {comment: comment}))
            .then(() => {
                dispatch(questionActions.getAllQuestionsThunk())
            })
            .then(() => {
                closeModal()
            })
    }

      return (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <input style={{height: 100, width: 300}}
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <div style={{textAlign:'center'}}>
            <button className='post-comment' disabled={comment.length < 3}type="submit">Add a Comment</button>
            </div>
          </form>
        </>
      );
  }

  export default PostAnswerCommentModal;
