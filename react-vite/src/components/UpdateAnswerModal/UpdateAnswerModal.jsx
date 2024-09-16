import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from "react";
import { updateAnswerThunk } from "../../redux/answers";



const UpdateAnswerModal = ({answer, answerUpdated}) => {
    const { closeModal } = useModal();
    const [newAnswer, setNewAnswer] = useState(answer.answer)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const body = {
            answer: newAnswer
        }

        dispatch(updateAnswerThunk(answer.id, body))
            .then(() => {
                answerUpdated();
                closeModal();
            })


    }

    const handleChange = (e) => {
        setNewAnswer(e.target.value);
    }


    return (
        <div className="modal">
            <div className='md-demo-div middle bold'>
              Update Answer
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    id="answer-area"
                    value={newAnswer}
                    onChange={handleChange}
                />
                <button className='md-button' type="submit">Update</button>
                <button className='md-button' onClick={closeModal}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateAnswerModal
