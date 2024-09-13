import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchComment, fetchEditComment, fetchComments} from '../../redux/questions';
import {useNavigate} from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './EditComment.css'

const EditQuestionCommentModal = ({commentId}) => {
    const questionComment = useSelector(state => state.questionState.questionComments[commentId])
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("")
    const { closeModal } = useModal()
    console.log(questionComment, '<----- QC')

    const updateComment = (e) => setComment(e.target.value)

    // useEffect(() => {
    //     Promise.all([
    //         dispatch(fetchComment(commentId))
    //         .then(() => setIsLoaded(true))
    //     ])
    // }, [dispatch, commentId])

    const handleSubmit = async (e) => {
        dispatch(fetchComment(commentId))
        .then(() => {
            closeModal()
        })

        if (!user) {
            return <p>Please Login</p>;
        }
        const payload = {
            comment
        }

        dispatch(fetchEditComment(payload, questionComment.id))
        .then(() => navigate(`/questions/${questionComment.questionId}`))
    }

    // if (!isLoaded) {
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input style={{height: 100, width: 300}}
                           type="text"
                           placeholder="Edit comment"
                           defaultValue={questionComment.comment}
                           onChange={updateComment}
                    />
                </label>
                <div style={{textAlign: 'center'}}>
                    <button className='post-comment' disabled={comment.length < 3} type="submit">Edit Comment</button>
                </div>
            </form>
        </>
    );
}

export default EditQuestionCommentModal
