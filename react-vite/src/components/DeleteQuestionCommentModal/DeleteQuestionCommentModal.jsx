import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useNavigate } from 'react-router-dom';
import * as questionActions from "../../redux/questions"
import { useParams } from "react-router-dom";


const DeleteQuestionCommentModal = ({commentId}) => {
    const { id } = useParams()
    const { closeModal } = useModal();
    // const questionId = useSelector(state => state.questionState.questionComments)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(id)

    const handleSubmit = () => {
        dispatch(questionActions.deleteQuestionComment(commentId))
        .then(() => {
            dispatch(questionActions.fetchComments(id))
            closeModal();
        })
    }

    return (
        <div className="delete-answer-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you wish to delete this comment?</p>
            <button
                className="delete-button"
                onClick={handleSubmit}
            >Yes (Delete comment)</button>
            <button className="keep-button"
                onClick={closeModal}
            >No (Keep comment)</button>
        </div>
    )
}

export default DeleteQuestionCommentModal
