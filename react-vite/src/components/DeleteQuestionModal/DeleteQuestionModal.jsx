import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteQuestionThunk } from "../../redux/questions";



const DeleteQuestionModal = ({questionId, questionDeleted}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(deleteQuestionThunk(questionId))
            .then(() => {
                questionDeleted();
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

            >Yes (Delete question)</button>
            <button className="md-button"
                onClick={closeModal}
            >No (Keep question)</button>
        </div>
    )
}

export default DeleteQuestionModal
