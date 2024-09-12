import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { getQuestionTagsThunk } from "../../redux/tags";
import { fetchComments, fetchEditComment } from "../../redux/questions";
import { getAllQuestionsThunk } from "../../redux/questions";


const QuestionDetails = () => {
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [questionTags, setQuestionTags] = useState({});
    const questionsById = useSelector(state => state.questionState.byId)
    const dispatch = useDispatch();



    useEffect(() => {
        console.log("use effect");
        const getQuestion = async () => {
            let tags = await dispatch(getQuestionTagsThunk(id));
            setQuestionTags(tags.Tags);
            await dispatch(getAllQuestionsThunk());
            setIsLoaded(true);
        }
        getQuestion();
// will move when the question file is created.
    }, [isLoaded, dispatch, setQuestionTags])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    let question = questionsById[id];
// We're going to get relevant tags


    return (
        <div className="QuestionDetails">
            <div className="QuestionDetails-question">
                <div className="QuestionDetails-subject">
                    {question.subject}
                </div>
                <div className="QuestionDetails-question">
                    {question.question}
                </div>
                <div className="QuestionDetails-tags">
                    {console.log("questionTags: ",questionTags)}
                    {questionTags.map((tag, idx)=>{
                        return (
                            <span key={idx} className="TagBubble">
                                <NavLink to={`/questions/${tag.tagName}`}>{tag.tagName}</NavLink>
                            </span>
                        )
                    })}
                </div>
            </div>
            <div className="QuestionDetails-comments">
                comments
            </div>
            <div className="QuestionDetails-answers">
                answers
                <div className="QuestionDetails-answers-component">
                    answer component list
                </div>
            </div>
        </div>
    )

}

export default QuestionDetails
