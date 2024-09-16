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
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";




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
                    <div>
                      {user !== null &&<button
                        onClick={follow}
                        className="follow-button"
                        title={alreadyFollowed ? "Unsave this question" : "Save this question"}>
                        {alreadyFollowed ?
                        <AiOutlineMinusCircle /> : <AiFillPlusCircle />}
                      </button>}
                    </div>
                </div>
                <div className="QuestionDetails-user">
                  Asked By {question.User.username}
                </div>
                <div className="QuestionDetails-question">
                    {question.question}
                </div>

                <div className="QuestionDetails-tags">
                    {questionTags.map((tag) => {
                        return (
                              <TagBubble tag={tag} idx={tag.id} />
                        )
                    })}
                </div>
            </div>

              {user !== null &&<OpenModalMenuItem
                itemText="Add a Comment"
                onItemClick={closeMenu}
                className="QuestionDetails-buttons"
                modalComponent={<PostQuestionCommentModal questionId = {question.id}/>}
              />}

              <div className="QuestionComments">
                {Object.values(comments).map((comment) => {
                  return (
                    <div className="QuestionComments-comment" key={comment.id}>
                      <span className="comment">{comment.comment}</span>
                      <span className="QuestionDetails-user"> - {comment.User.username}</span>
                      {user === comment.User.id && <OpenModalMenuItem
                        itemText="Edit Comment"
                        onItemClick={closeMenu}
                        className="QuestionDetails-buttons"
                        modalComponent={<EditQuestionCommentModal
                        commentId={comment.id} oldComment={comment.comment} questionId={id}/>}
                      />}
                      {user === comment.User.id && <OpenModalMenuItem
                        itemText="Delete Comment"
                        onItemClick={closeMenu}
                        className="QuestionDetails-buttons"
                        modalComponent={<DeleteQuestionCommentModal commentId={comment.id} questionId={question}/>}
                      />}
                    </div>
                  )
                })}
              </div>

            <div className="QuestionDetails-answers">
            <h4>Answers {user !== null &&<OpenModalMenuItem
                itemText="Add an Answer"
                onItemClick={closeMenu}
                className="QuestionDetails-buttons"
                modalComponent={<AnswerCreatePage questionId = {question.id}/>}
              />}</h4>
            {question.Answer.length < 1 && <span>No answers yet, add your own!</span>}
                {question.Answer.map((answer, idx)=>{
                    console.log(answer, '<---------AAAA')
                    return (
                        <div key={idx}>
                            <div className="Answer">

                                {answer.answer}
                                <div className="QuestionDetails-user"> Answered By {answer.User.username}</div>
                                <>
                                {user !== null &&<OpenModalMenuItem
                                itemText="Add a Comment"
                                onItemClick={closeMenu}
                                className="QuestionDetails-buttons"
                                modalComponent={<PostAnswerCommentModal questionId={question.id} answerId={answer.id}/>}
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
                                            <span className="QuestionDetails-user"> - {comment.User.username}</span>
                                            {user === comment.User.id && <OpenModalMenuItem
                                                itemText="Edit Comment"
                                                onItemClick={closeMenu}
                                                className="QuestionDetails-buttons"
                                                modalComponent={<EditAnswerCommentModal
                                                  commentId={comment.id} oldComment={comment.comment}/>}
                            />}
                            {user === comment.User.id && <OpenModalMenuItem
                                itemText="Delete Comment"
                                onItemClick={closeMenu}
                                className="QuestionDetails-buttons"
                                modalComponent={<DeleteAnswerCommentModal commentId={comment.id} />}
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
