import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useEffect, useState } from "react";
import { createTags, getQuestionTagsThunk } from "../../redux/tags";
import { updateQuestionThunk } from "../../redux/questions";




const UpdateQuestionModal = ({question, questionUpdated}) => {
    const { closeModal } = useModal();
    const [newQuestion, setNewQuestion] = useState(question.question);
    const [newSubject, setNewSubject] = useState(question.subject);
    const questionTags = useSelector(store => store.tagState.allTags);

    const tagArr = questionTags.map(tag => {
        return tag.tagName
    })
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(tagArr);
    const [tagError, setTagError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const getQuestionTags = async () => {
            const fetchedTags = await dispatch(getQuestionTagsThunk(question.id));
            if (fetchedTags) {
                setTags(fetchedTags.Tags.map(tag => tag.tagName));
            }
        };

        getQuestionTags();
    }, [dispatch, question.id]);


    useEffect(() => {
        if(!tagInput.includes(' ')) setTagError(false);
    }, [tagInput]);


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const body = {
            question: newQuestion,
            subject: newSubject
        }

        dispatch(updateQuestionThunk(question.id, body))
        dispatch(createTags({tags, questionId: question.id}))
            .then(() => {
                questionUpdated();
                closeModal();
            })
        console.log('Form Submitted')

    }
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

    const handleSubject = e => setNewSubject(e.target.value);
    const handleQuestion = e => setNewQuestion(e.target.value);
    const handleTagInput = e => setTagInput(e.target.value);
    const handleDeleteTag = e => {
      console.log(e);
    }


    return (
        <div className="question-ask">
            <div className='md-demo-div middle bold'>
              Update Question
            </div>
            <form onSubmit={handleSubmit} className="question-form">

                    <h4>Title</h4>
                    <input
                        value={newSubject}
                        onChange={handleSubject}
                        type="text"
                        name="subject"
                        placeholder="Title of your question"
                    />


                    <h4>What are the details of your Question?</h4>
                    <textarea
                        id="questoin-area"
                        name="question"
                        value={newQuestion}
                        onChange={handleQuestion}
                        rows={8}
                        placeholder="Please write at least 30 characters"
                    />


                <h4>Tags</h4>
                    <input
                    value={tagInput}
                    onChange={handleTagInput}
                    type="text"
                    name="tagName"
                    />
                    <button
                    type="button"
                    onClick={handleTagSubmit}
                    disabled={tagInput.length == 0}
                    >
                    Add Tag
                    </button>
                    <button
                    type="button"
                    onClick={handleTagReset}
                    >
                    Reset
                    </button>


                {tagError && <div className='error'>Name of the tag cannot have spaces, try replace using -</div>}

                <div className="question-tagContainer">
                  {tags.map((tag, idx) => {
                      return (<label className='tag-label'
                        onClick={() => {
                          let newArr = JSON.parse(JSON.stringify(tags));
                          newArr.splice(idx, 1);
                          setTags(newArr);
                        }} key={tag}># {tag}</label>)
                    }
                  )}
                </div>

                {!(tags.length) && (<div className='error'>Need At Least One Tag</div>)}
                <div className="middle">

                    <button
                    disabled={(!newSubject) || (newQuestion.length < 30) || (tags.length < 1)}
                    type="submit"
                    >
                    Update Question
                    </button>
                    <button onClick={closeModal}>Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateQuestionModal;
