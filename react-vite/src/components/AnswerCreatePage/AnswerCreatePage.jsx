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


function AnswerCreatePage({ subject, questionId }) {
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const {id} = useParams()

    const [answer, setAnswer] = useState('');
    const [answerError, setAnswerError] = useState(false);
    const { closeModal } = useModal();


    const handleAnswer = e => setAnswer(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(answer, questionId)
        createAnswer(questionId, {answer: answer})
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
        className='question-form'
      >
        <h3 className="md-demo-div middle bold">Answer to This Question: </h3>
        <h4>{subject}</h4>
        <textarea
          value={answer}
          onChange={handleAnswer}
          type="text"
          name="answer"
          rows="8"
          placeholder=""
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
      <div className='question-ask'>
        {answerForm}
      </div>
    );
  }

  export default AnswerCreatePage;
