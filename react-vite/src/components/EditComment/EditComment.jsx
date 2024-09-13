import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditComment, fetchComments } from '../../redux/questions';
import { useParams, useNavigate } from 'react-router-dom';
import './EditComment.css'

const EditQuestionCommentModal = () => {
    const params = useParams();
    console.log(params, '<-------- QC');
    // const { commentId } = useParams();
    const questionComment = useSelector(state => state.questionState.questionComments.questionId)
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("")
    // console.log(commentId, questionComment, '<------- QC')

    const updateComment = (e) => setComment(e.target.value)

    useEffect(() => {
        dispatch(fetchComments().then(()=> setIsLoaded(true)))
    }, [dispatch])

    useEffect(() => {
        if (!questionComment) return
        setComment(questionComment.comment)
    , [questionComment]})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
        return <p>Please Login</p>;
        }
        const payload = {
            comment
        }

        dispatch(fetchEditComment(payload, questionComment.id))
        .then(() => navigate(`/questions/${questionComment.questionId}`))
    }

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     navigate(`/questions/${questionComment.questionId}`)
    //   };

      return (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <input style={{height: 100, width: 300}}
                type="text"
                placeholder="Edit comment"
                value={comment}
                onChange={updateComment}
              />
            </label>
            <div style={{textAlign:'center'}}>
            <button className='post-comment' disabled={comment.length < 3}type="submit">Edit Comment</button>
            </div>
          </form>
        </>
      );

}

export default EditQuestionCommentModal
