import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteAnswerThunk } from "../../redux/answers";


const DeleteAnswerModal = ({answerId, answerDeleted}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const data = dispatch(deleteAnswerThunk(answerId))
            .then(() => {
                answerDeleted();
                closeModal();
            })
    }

    return (
        <div className="delete-answer-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you wish to delete this answer?</p>
            <button
                className="delete-button"
                onClick={handleDelete}
            >Yes (Delete answer)</button>
            <button className="keep-button"
                onClick={closeModal}
            >No (Keep answer)</button>
        </div>
    )
}

export default DeleteAnswerModal