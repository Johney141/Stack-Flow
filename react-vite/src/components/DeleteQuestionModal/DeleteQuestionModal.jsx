import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteQuestionThunk } from "../../redux/questions";



const DeleteQuestionModal = ({questionId, questionDeleted}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const data = dispatch(deleteQuestionThunk(questionId))
            .then(() => {
                questionDeleted();
                closeModal();
            })
    }

    return (
        <div className="delete-question-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you wish to delete this question?</p>
            <button
                className="delete-button"  
                onClick={handleDelete}
                
            >Yes (Delete question)</button>
            <button className="keep-button"
                onClick={closeModal}
            >No (Keep question)</button>
        </div>
    )
}

export default DeleteQuestionModal