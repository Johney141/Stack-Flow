import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './ProfilePage.css'
import { getUserQuestionsThunk } from "../../redux/questions";


const ProfilePage = () => {
    const [isLoaded, setIsLoaded] = useState();
    const user = useSelector((store) => store.session.user);
    const questions = useSelector((store) => store.questionState.allQuestions);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserData = async () => {
            await dispatch(getUserQuestionsThunk())

        }
    })




    return (
        <h1>Testing</h1>
    )
}

export default ProfilePage