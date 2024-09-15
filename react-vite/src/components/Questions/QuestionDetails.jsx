import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getQuestionTagsThunk} from "../../redux/tags";
import {fetchComments, getAllQuestionsThunk} from "../../redux/questions";
import PostQuestionCommentModal from "../PostQuestionComment/PostQuestionComment"
import PostAnswerCommentModal from "../PostAnswerCommentModal/PostAnswerCommentModal";
import EditQuestionCommentModal from "../EditComment/EditComment";
import DeleteQuestionCommentModal from "../DeleteQuestionCommentModal/DeleteQuestionCommentModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import * as followActions from '../../redux/following';
import * as questionActions from '../../redux/questions'
import AnswerCreatePage from "../AnswerCreatePage/AnswerCreatePage";
import DeleteAnswerCommentModal from "../DeleteAnswerCommentModal/DeleteAnswerCommentModal";



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
    const alreadyFollowed = Object.values(followings).find(following => following.questionId == id)
    console.log(questionsById[id], '<-----Comments')

    const dispatch = useDispatch();
    useEffect(() => {
        Promise.all([
            dispatch(getAllQuestionsThunk()),
            dispatch(fetchComments(id)),
            dispatch(followActions.fetchFollowings()),
            dispatch(getQuestionTagsThunk(id))
        ]).then(([, , , tags]) => {
            setQuestionTags(tags.Tags);
            setIsLoaded(true);
        })
    }, [dispatch, id])

    // will move when the question file is created.
    const closeMenu = () => setShowMenu(false);


    const follow = (e) => {
        const payload = {questionId: id}
        e.preventDefault();
        if (alreadyFollowed) {
            dispatch(followActions.fetchUnfollow(id, payload))
                .then(() => dispatch(followActions.fetchFollowings()));
        }
        else {
            dispatch(followActions.fetchFollow(id, payload))
                .then(() => dispatch(followActions.fetchFollowings()));
        }
      }

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    let question = questionsById[id];
    let comment = comments[id]
    // console.log(question, '<------subject')
    // const answers = question.Answer
    // const answerId = answers.answer
    // const singleAnswer = Object.values(answers)
    // console.log(question, '<----question', answers, '<----Answer', singleAnswer, '<-----AnswerId')

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
                    <button onClick={follow}>{alreadyFollowed ? 'Unfollow' : 'Follow'}</button>
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
                    console.log(user, '<---user', comment.id, '<-----CU')
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.User.username}</p>
                            {user === comment.User.id && <OpenModalMenuItem
                                itemText="Edit Comment"
                                onItemClick={closeMenu}
                                modalComponent={<EditQuestionCommentModal commentId={comment.id}/>}
                            />}
                            {user === comment.User.id && <OpenModalMenuItem
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
            {<OpenModalMenuItem
                itemText="Add an Answer"
                onItemClick={closeMenu}
                modalComponent={<AnswerCreatePage questionId = {question.id}/>}
              />}
                {question.Answer.map((answer, idx)=>{
                    console.log(answer.id, '<---------AAAA')
                    return (
                        <div className="AnswerDiv" key={idx}>
                            <div className="Answer">
                                {answer.answer}
                                <>
                                <OpenModalMenuItem
                                itemText="Add a Comment"
                                onItemClick={closeMenu}
                                modalComponent={<PostAnswerCommentModal answerId = {answer.id}/>}
                                />
                                </>
                            </div>
                            <div className="AnswerComments">
                                {answer.AnswerComments.map((comment, idx)=>{
                                    let key = "a" + idx;
                                    return(
                                        <div className="AnswerComments-comment" key={key}>
                                            <span className="comment">{comment.comment}</span>
                                            <span className="comment-username">{comment.User.username}</span>
                                            {user === answer.user_id && <OpenModalMenuItem
                                itemText="Edit Comment"
                                onItemClick={closeMenu}
                                modalComponent={<EditQuestionCommentModal answerId={answer.id}/>}
                            />}
                            {user === answer.user_id && <OpenModalMenuItem
                                itemText="Delete Comment"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteAnswerCommentModal commentId={answer.id} answerId={answer.answer_id}/>}
                            />}
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default QuestionDetails
