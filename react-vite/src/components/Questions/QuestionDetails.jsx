import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { getQuestionTagsThunk } from "../../redux/tags";
import { fetchComments, fetchEditComment } from "../../redux/questions";
import { getAllQuestionsThunk } from "../../redux/questions";
import PostQuestionCommentModal from "../PostQuestionComment/PostQuestionComment"
import EditQuestionCommentModal from "../EditComment/EditComment";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";


const QuestionDetails = () => {
    const {id} = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [questionTags, setQuestionTags] = useState({});
    const ulRef = useRef()
    const sessionUser = useSelector(state => state.session.user)
    const questionsById = useSelector(state => state.questionState.byId)
    const comments =  useSelector(state => state.questionState.questionComments)
    const user = sessionUser ? sessionUser.id : null
    const dispatch = useDispatch();



    useEffect(() => {

        const getQuestion = async () => {
            let tags = await dispatch(getQuestionTagsThunk(id));
            setQuestionTags(tags.Tags);
            await dispatch(getAllQuestionsThunk());
            await dispatch(fetchComments())
            setIsLoaded(true);
        }
        console.log(comments, '<------- Comments');
        getQuestion();
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);

// will move when the question file is created.
        const editComment = (commentId) => {
            Navigate(`/questions/comments/${commentId}/edit`)
        }
// will move when the question file is created.
    }, [isLoaded, dispatch, setQuestionTags])

    const closeMenu = () => setShowMenu(false);

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    let question = questionsById[id];
    console.log(question.id, '<-------question')
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
                <h4>Question Comment Section starts here</h4>
                {Object.values(comments).map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <OpenModalMenuItem
                            itemText="Edit Comment"
                            onItemClick={closeMenu}
                            modalComponent={<EditQuestionCommentModal questionId = {question.id}/>}
                            />
                            <p>{comment.User.username}</p>
                        </div>

                    )
                })}
                <button>Delete</button>
                <>
                <OpenModalMenuItem
                itemText="Edit Comment"
                onItemClick={closeMenu}
                modalComponent={<EditQuestionCommentModal questionId = {question.id}/>}
              />
              <OpenModalMenuItem
                itemText="Add a Comment"
                onItemClick={closeMenu}
                modalComponent={<PostQuestionCommentModal questionId = {question.id}/>}
              />
            </>
            <h4>Question Comment Section ends</h4>
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
