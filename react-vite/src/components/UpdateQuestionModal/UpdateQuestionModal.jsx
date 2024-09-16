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


    return (
        <div className="modal">
            <div className='md-demo-div middle bold'>
              Update Question
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subject">Title</label>
                    <input
                        value={newSubject}
                        onChange={handleSubject}
                        type="text"
                        name="subject"
                        placeholder="Title of your question"
                    />
                </div>
                <div>
                    <label for="question">What are the details of your Question?</label>
                    <textarea
                        id="questoin-area"
                        name="question"
                        value={newQuestion}
                        onChange={handleQuestion}
                        placeholder="Please write at least 30 characters"
                    />
                </div>
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
                    disabled={(!newSubject) || (newQuestion.length < 30)}
                    type="submit"
                    >
                    Update Question
                    </button>
                </div>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateQuestionModal;
