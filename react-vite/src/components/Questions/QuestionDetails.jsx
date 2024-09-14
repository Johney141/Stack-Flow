import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getQuestionTagsThunk} from "../../redux/tags";
import {fetchComments, getAllQuestionsThunk} from "../../redux/questions";
import PostQuestionCommentModal from "../PostQuestionComment/PostQuestionComment"
import EditQuestionCommentModal from "../EditComment/EditComment";
import DeleteQuestionCommentModal from "../DeleteQuestionCommentModal/DeleteQuestionCommentModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


const QuestionDetails = () => {
    const {id} = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [questionTags, setQuestionTags] = useState({});
    let sessionUser = -1
    if(useSelector(state => state.session.user !== null)){
        sessionUser = useSelector(state => state.session.user.id);
    }
    // const sessionUser = useSelector(state => state.session.user.id)
    const questionsById = useSelector(state => state.questionState.byId)
    const comments = useSelector(state => state.questionState.questionComments)
    const dispatch = useDispatch();
    useEffect(() => {
        const getQuestion = async () => {
            let tags = await dispatch(getQuestionTagsThunk(id));
            setQuestionTags(tags.Tags);
            await dispatch(getAllQuestionsThunk());
            await dispatch(fetchComments(id))
            setIsLoaded(true);
        }
        getQuestion();
    }, [dispatch, id, setQuestionTags, isLoaded])

    // will move when the question file is created.
    const closeMenu = () => setShowMenu(false);

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    let question = questionsById[id];

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
                    {questionTags.map((tag, idx) => {
                        return (
                            <span key={idx} className="TagBubble">
                                <NavLink to={`/questions/${tag.tagName}`}>{tag.tagName}</NavLink>
                            </span>
                        )
                    })}
                </div>
            </div>
            <div className="QuestionDetails-comments">
                <h4>Question Comment Section starts here</h4>
                {question.QuestionComment.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.User.username}</p>
                            {sessionUser === comment.userId && <OpenModalMenuItem
                                itemText="Edit Comment"
                                onItemClick={closeMenu}
                                modalComponent={<EditQuestionCommentModal commentId={comment.id}/>}
                            />}
                            {sessionUser === comment.userId && <OpenModalMenuItem
                                itemText="Delete Comment"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteQuestionCommentModal commentId={comment.id} questionId={question}/>}
                            />}
                        </div>

                    )
                })}
                <>
              <OpenModalMenuItem
                itemText="Add a Comment"
                onItemClick={closeMenu}
                modalComponent={<PostQuestionCommentModal questionId = {question.id}/>}
              />
            </>
            <h4>Question Comment Section ends</h4>
                <h4>Question Comment Section ends</h4>
            </div>
            <div className="QuestionDetails-answers">

            </div>
        </div>
    )
}

export default QuestionDetails
