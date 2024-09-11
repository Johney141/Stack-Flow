import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"


const DeleteAnswerModal = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <div className="delete-answer-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you wish to delete this answer?</p>
            <button
                className="delete-button"
                
            >Yes (Delete answer)</button>
            <button className="keep-button"
                onClick={closeModal}
            >No (Keep answer)</button>
        </div>
    )
}

export default DeleteAnswerModal