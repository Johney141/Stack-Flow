import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import { createQuestion } from '../../redux/questions';
import { createTags } from '../../redux/tags';

import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

function QuestionCreatePage() {
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const { closeModal } = useModal();

  const [tagError, setTagError] = useState(false);

  const handleSubject = e => setSubject(e.target.value);
  const handleQuestion = e => setQuestion(e.target.value);
  const handleTagInput = e => setTagInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      question, subject
    }
    const questionId = await dispatch(createQuestion(newQuestion));
    await dispatch(createTags({tags, questionId}));
    navigate(`/questions/${questionId}`);
    closeModal();
  };

  const handleTagSubmit = e => {
    e.preventDefault();

    if(tagInput.includes(' ')) {
      setTagError(true);
    }
    else {
      let newtags = JSON.parse(JSON.stringify(tags));
      newtags.push(tagInput.toLowerCase());
      setTagInput('');
      setTags(newtags);
    }
  };

  const handleTagReset = e => {
    e.preventDefault();
    setTags([]);
  }

  useEffect(() => {
    if(!tagInput.includes(' ')) setTagError(false);
  }, [tagInput]);

  let questionForm;
  if (user) {
    questionForm = (
    <form
      onSubmit={handleSubmit}
      className='question-form'
    >
      <h3>Ask a Question on Stack Flow</h3>
      <h4>Title</h4>
      <div>Please be specific even if this is only the title of your question. Cannot be empty.</div>
      <input
        value={subject}
        onChange={handleSubject}
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
        {tags.map((tag) => (<label className='tag-label' key={tag}># {tag}</label>))}
      </div>
      {!(tags.length) && (<div className='error'>Need At Least One Tag</div>)}
      <div className='middle'>
        <button
          disabled={(!subject) || (question.length < 30) || (tags.length < 1)}
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
        <h2 className='user-modify-button'>You need to <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        /> first.</h2>
      </>
    )
  }

  return (
    <div className='question-ask'>
      {questionForm}
    </div>
  );
}

export default QuestionCreatePage;
