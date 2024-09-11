import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAllTagsThunk } from "../../redux/tags";
import { fetchComments, fetchEditComment } from "../../redux/questions";


const QuestionList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const questions = useSelector(state => state.questionState.allTags)
    const comments =  useSelector(state => state.questionState)
    const dispatch = useDispatch();

    useEffect(() => {
        const getQuestions = async () => {
            await dispatch(getAllTagsThunk())
            setIsLoaded(true);
        }
// will move when the question file is created.
        const getComments = async () => {
            await dispatch(fetchComments())
            setIsLoaded(true)
        }
// will move when the question file is created.
        const editComment = (commentId) => {
            Navigate(`/questions/comments/${commentId}/edit`)
        }
        if(!isLoaded) {
            getQuestions()
            getComments()

        }
    }, [isLoaded, dispatch])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }
    console.log(questions)
    console.log(comments)
    return (
        <div className="question-list">
            list
        </div>

    )
}

export default QuestionList
