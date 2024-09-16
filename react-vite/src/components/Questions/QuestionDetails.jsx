import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getQuestionTagsThunk} from "../../redux/tags";
import {fetchComments, getAllQuestionsThunk} from "../../redux/questions";
import PostQuestionCommentModal from "../PostQuestionComment/PostQuestionComment"
import PostAnswerCommentModal from "../PostAnswerCommentModal/PostAnswerCommentModal";
import EditQuestionCommentModal from "../EditQuestionComment/EditComment";
import EditAnswerCommentModal from "../EditAnswerComment/EditComment";
import DeleteQuestionCommentModal from "../DeleteQuestionCommentModal/DeleteQuestionCommentModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import * as followActions from '../../redux/following';
import * as questionActions from '../../redux/questions'
import AnswerCreatePage from "../AnswerCreatePage/AnswerCreatePage";
import DeleteAnswerCommentModal from "../DeleteAnswerCommentModal/DeleteAnswerCommentModal";
import './Question.css';
import TagBubble from "../TagBubble/TagBubble";




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

    console.log(questionTags);

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

    console.log(comments);

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
                {user !== null &&<button onClick={follow}>{alreadyFollowed ? 'Unfollow' : 'Follow'}</button>}
                </div>
                <div className="QuestionDetails-tags">
                    {questionTags.map((tag) => {
                        return (
                              <TagBubble tag={tag} idx={tag.id} />
                        )
                    })}
                </div>
            </div>
            <div className="QuestionDetails-comments">
                <h4>Comments</h4>
                {Object.values(comments).length < 1 && <span>No comments yet, add your own!</span>}
                {Object.values(comments).map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p> - {comment.User.username}</p>
                            {user === comment.User.id && <OpenModalMenuItem
                                itemText="Edit Comment"
                                onItemClick={closeMenu}
                                modalComponent={<EditQuestionCommentModal
                                  commentId={comment.id} oldComment={comment.comment} questionId={id}/>}
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
              {user !== null &&<OpenModalMenuItem
                itemText="Add a Comment"
                onItemClick={closeMenu}
                modalComponent={<PostQuestionCommentModal questionId = {question.id}/>}
              />}
            </>

            </div>
            <div className="QuestionDetails-answers">
            <h4>Answers</h4>
            {question.Answer.length < 1 && <span>No answers yet, add your own!</span>}
            {user !== null &&<OpenModalMenuItem
                itemText="Add an Answer"
                onItemClick={closeMenu}
                modalComponent={<AnswerCreatePage questionId = {question.id}/>}
              />}
                {question.Answer.map((answer, idx)=>{
                    console.log(answer, '<---------AAAA')
                    return (
                        <div className="AnswerDiv" key={idx}>
                            <hr/>
                            <div className="Answer">

                                {answer.answer}
                                <h4> - {answer.User.username}</h4>
                                <>
                                {user !== null &&<OpenModalMenuItem
                                itemText="Add a Comment"
                                onItemClick={closeMenu}
                                modalComponent={<PostAnswerCommentModal answerId = {answer.id}/>}
                                />}
                                </>
                            </div>
                            <div className="AnswerComments">
                                {answer.AnswerComments.map((comment, idx)=>{

                                    console.log("Comment: ", comment);
                                    let key = "a" + idx;
                                    return(
                                        <div className="AnswerComments-comment" key={key}>
                                            <span className="comment">{comment.comment}</span>
                                            <span className="comment-username"> - {comment.User.username}</span>
                                            {user === comment.User.id && <OpenModalMenuItem
                                                itemText="Edit Comment"
                                                onItemClick={closeMenu}
                                                modalComponent={<EditAnswerCommentModal
                                                  commentId={comment.id} oldComment={comment.comment}/>}
                            />}
                            {user === comment.User.id && <OpenModalMenuItem
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
