import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteAnswerThunk } from "../../redux/answers";


const DeleteAnswerModal = ({answerId, answerDeleted}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(deleteAnswerThunk(answerId))
            .then(() => {
                answerDeleted();
                closeModal();
            })
    }

    return (
        <div className="modal">
            <div className="md-demo-div middle bold">Confirm Delete</div>
            <div className="error">Are you sure you wish to delete this question?</div>
            <button
                className="md-button"
                onClick={handleDelete}
            >Yes (Delete answer)</button>
            <button className="md-button"
                onClick={closeModal}
            >No (Keep answer)</button>
        </div>
    )
}

export default DeleteAnswerModal
