import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAllTagsThunk } from "../../redux/tags";


const QuestionList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const questions = useSelector(state => state.questionState.allTags)
    const dispatch = useDispatch();

    useEffect(() => {
        const getQuestions = async () => {
            await dispatch(getAllTagsThunk())
            setIsLoaded(true);
        }

        if(!isLoaded) {
            getQuestions()

        }
    }, [isLoaded, dispatch])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }
    console.log(questions)
    return (
        <div className="question-list">
            list
        </div>

    )
}

export default QuestionList
