import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createAnswer } from '../../redux/questions';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import { useParams } from 'react-router-dom';

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
      e.preventDefault();

      const newAnswer = {
        answer
      }
      const answerId = await dispatch(createAnswer(id, newAnswer));
      navigate(`/questions/${id}`);
      closeModal();
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
          placeholder="Title of your question"
        />

        <h4>What are the details of your Question?</h4>
        <div>Minimum of 30 characters required.</div>
        <textarea
          value={question}
          onChange={handleQuestion}
          name="question" rows="8"
          placeholder="Please write at least 30 characters"
        />

        <h4>Tags</h4>
        <div>
          <input
            value={tagInput}
            onChange={handleTagInput}
            type="text"
            name="tagName"
          />
          <button
            type="button"
            onClick={handleTagSubmit}
          >
            Add Tag
          </button>
          <button
            type="button"
            onClick={handleTagReset}
          >
            Reset
          </button>
        </div>

        {tagError && <div className='error'>Name of the tag cannot have spaces, try replace using -</div>}

        <div>
          {tags.map((tag) => (<label className='tag-label' key={tag}>{tag}</label>))}
        </div>

        <div>
          {!(tags.length) && (<div className='error'>Need At Least One Tag</div>)}
          <button
            disabled={(!subject) || (question.length < 30)}
            type="submit"
          >
            Create Question
          </button>
        </div>
      </form>
      );
    }
    else {
      questionForm = (
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
        {questionForm}
      </div>
    );
  }

  export default AnswerCreatePage;
