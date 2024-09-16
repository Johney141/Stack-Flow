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
        e.preventDefault()
        dispatch(answerActions.deleteAnswerComment(commentId))
            .then(() => {
                dispatch(questionActions.getAllQuestionsThunk())
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

export default DeleteAnswerCommentModal
