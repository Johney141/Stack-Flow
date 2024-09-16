import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import * as questionActions from "../../redux/questions"
import { useParams, useNavigate } from "react-router-dom";


const DeleteQuestionCommentModal = ({commentId}) => {
    const { id } = useParams()
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(questionActions.deleteQuestionComment(commentId))
        .then(() => {
            dispatch(questionActions.fetchComments(id))
        })
        .then(() => {
            closeModal()
        })
    }

    return (
        <div className="modal">
            <div className="md-demo-div middle bold">Confirm Delete</div>
            <div className="error">Are you sure you wish to delete this comment?</div>
            <button
                className="md-button"
                onClick={handleSubmit}
            >Yes (Delete comment)</button>
            <button className="md-button"
                onClick={closeModal}
            >No (Keep comment)</button>
        </div>
    )
}

export default DeleteQuestionCommentModal
