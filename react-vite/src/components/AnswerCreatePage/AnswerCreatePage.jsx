import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createAnswer } from '../../redux/questions';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import { useParams } from 'react-router-dom';
import * as questionActions from "../../redux/questions"
import { getAllQuestionsThunk } from '../../redux/questions';


function AnswerCreatePage() {
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()

    const [answer, setAnswer] = useState('');
    const [answerError, setAnswerError] = useState(false);
    const { closeModal } = useModal();


    const handleAnswer = e => setAnswer(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(answer, id)
        createAnswer(id, {answer: answer})
            .then(() => {
                dispatch(getAllQuestionsThunk())
            })
            .then(() => closeModal())
            .catch(error => setAnswerError(true))
    };





    let answerForm;
    if (user) {
      answerForm = (
      <form
        onSubmit={handleSubmit}
      >
        <h3>Help Answer This Question!</h3>
        <h4>Title</h4>
        <div>Don't leave a blank answer</div>
        <input
          value={answer}
          onChange={handleAnswer}
          type="text"
          name="subject"
          placeholder="Answer"
        />

        <div>
        {answerError && <div>You can only submit one answer per question</div>}
          <button
            disabled={(answer.length < 3 || answerError)}
            type="submit"
          >
            Create Answer
          </button>
        </div>
      </form>
      );
    }
    else {
      answerForm = (
        <>
          <h2>You need to <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          /> first.</h2>
        </>
      )
    }

    return (
      <div>
        {answerForm}
      </div>
    );
  }

  export default AnswerCreatePage;
