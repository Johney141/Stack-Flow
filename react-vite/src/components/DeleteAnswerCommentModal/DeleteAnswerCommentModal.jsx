import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import * as questionActions from "../../redux/questions"
import * as answerActions from '../../redux/answers'
import { useParams, useNavigate } from "react-router-dom";


const DeleteAnswerCommentModal = (commentId) => {
    const { id } = useParams()
    const { closeModal } = useModal();
    const questionsById = useSelector(state => state.questionState.byId)
    let question = questionsById[id];
    const dispatch = useDispatch();
    console.log(question, '<------ID'); // This will print the current URL to the console

    const handleSubmit = async (e) => {
        dispatch(answerActions.deleteAnswerComment(commentId))
        .then(() => {
            dispatch(questionActions.fetchComments(parseInt(id)))
            window.location.reload()
        })
        .then(() => {
            closeModal()
            console.log(id, '<-------commentID')
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

export default DeleteAnswerCommentModal
