import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createAnswer } from '../../redux/questions';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import { useParams } from 'react-router-dom';
import * as questionActions from "../../redux/questions"


function AnswerCreatePage() {
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()

    const [answer, setAnswer] = useState('');
    const { closeModal } = useModal();


    const handleAnswer = e => setAnswer(e.target.value);


    const handleSubmit = async (e) => {
        console.log(answer, id)
      e.preventDefault();
      createAnswer(id, {answer: answer})
      .then(() => {
        dispatch(questionActions.fetchComments(id))})
  .then(() => closeModal())
  .catch(error => console.log('oh shit'))
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
          <button
            disabled={(answer.length < 3)}
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
