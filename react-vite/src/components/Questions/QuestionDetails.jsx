import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getQuestionTagsThunk} from "../../redux/tags";
import {fetchComments, getAllQuestionsThunk} from "../../redux/questions";
import PostQuestionCommentModal from "../PostQuestionComment/PostQuestionComment"
import EditQuestionCommentModal from "../EditComment/EditComment";
import DeleteQuestionCommentModal from "../DeleteQuestionCommentModal/DeleteQuestionCommentModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import * as followActions from '../../redux/following';


const QuestionDetails = () => {
    const {id} = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [questionTags, setQuestionTags] = useState({});
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const questionsById = useSelector(state => state.questionState.byId)
    const comments = useSelector(state => state.questionState.questionComments)
    const followings = useSelector(state => state.followingState.allFollowings)
    const alreadyFollowed = Object.values(followings).find(following => following.questionId === id)
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


    const follow = (e) => {
        const payload = {questionId: id}
        e.preventDefault();
        if (alreadyFollowed) {
          Promise.all([
            dispatch(followActions.fetchUnfollow(id, payload)),
            dispatch(followActions.fetchFollowings())
          ])
        }
        else {
          Promise.all([
            dispatch(followActions.fetchFollow(id, payload)),
            dispatch(followActions.fetchFollowings())
          ]).then(() => {
            setIsLoaded(true);
          })
        }
      }

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
                <div className="follow-button">
                    <button onClick={follow}>Follow</button>
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
                {Object.values(comments).map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.User.username}</p>
                            {user === comment.userId && <OpenModalMenuItem
                                itemText="Edit Comment"
                                onItemClick={closeMenu}
                                modalComponent={<EditQuestionCommentModal commentId={comment.id}/>}
                            />}
                            {user === comment.userId && <OpenModalMenuItem
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
                answers
                <div className="QuestionDetails-answers-component">
                    answer component list
                </div>
            </div>
        </div>
    )
}

export default QuestionDetails
