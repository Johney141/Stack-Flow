import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './ProfilePage.css'
import { getUserQuestionsThunk } from "../../redux/questions";
import { getUserAnswersThunk } from "../../redux/answers";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteAnswerModal from "../DeleteAnswerModal/DeleteAnswerModal";
import DeleteQuestionModal from "../DeleteQuestionModal/DeleteQuestionModal";
import UpdateAnswerModal from "../UpdateAnswerModal/UpdateAnswerModal";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestoinModal";


const ProfilePage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [answerDeleted, setAnswerDeleted] = useState(false)
    const [questionDeleted, setQuestionDeleted] = useState(false)
    const [answerUpdated, setAnswerUpdated] = useState(false)
    const [questionUpdated, setQuestionUpdated] = useState(false)
    const {userId} = useParams();
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const questions = useSelector((store) => store.questionState.allQuestions);
    const answers = useSelector((store) => store.answerState.allAnswers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUsersProfile = userId == user.id



    useEffect(() => {
        const getUserData = async () => {
            await dispatch(getUserQuestionsThunk())
            await dispatch(getUserAnswersThunk())
            setIsLoaded(true)
        }

        if(!isLoaded) {
            getUserData();
        }
        if(answerDeleted || questionDeleted || answerUpdated || questionUpdated) {
            getUserData();
            setAnswerDeleted(false);
            setQuestionDeleted(false);
            setAnswerUpdated(false);
            setQuestionUpdated(false);

        }

    }, [isLoaded, answerDeleted, questionDeleted, answerUpdated, questionUpdated, dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
    const handleQuestionDeleted = () => {
        setQuestionDeleted(true);
    }
    const handleAnswerDeleted = () => {
        setAnswerDeleted(true);
    }
    const handleQuestionUpdated = () => {
        setQuestionUpdated(true);
    }
    const handleAnswerUpdated = () => {
        setAnswerUpdated(true);
    }

    return (
        <div className="profile-page-container">
            <h1>{isUsersProfile ? `Welcome to your profile ${user.username}!` : `${user.username}'s Profile`}</h1>

            <h3>Questions</h3>
            <div className="questions-container">
                {questions.map(question => (
                    <div
                        className="user-question"
                        key={question.id}
                        >
                        <p
                            onClick={() => navigate(`/questions/${question.id}`)}
                        >{question.question}</p>
                        {isUsersProfile ?
                            <>
                                <OpenModalMenuItem
                                    itemText='Update'
                                    className='question-update'
                                    onItemClick={closeMenu}
                                    modalComponent={<UpdateQuestionModal question={question} questionUpdated={handleQuestionUpdated}/>}
                                />
                                <OpenModalMenuItem
                                    itemText='Delete'
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteQuestionModal questionId={question.id} questionDeleted={handleQuestionDeleted}/>}
                                />
                            </>: null
                        }


                    </div>
                ))}
            </div>
            <div className="answers-container">
                <h3>Answers</h3>
                {answers.map(answer => (
                    <div
                        className="user-answer"
                        key={answer.id}
                    >
                        <p
                            onClick={() => navigate(`/questions/${answer.questionId}`)}
                        >{answer.answer}</p>
                        {isUsersProfile ?
                            <>
                                <OpenModalMenuItem
                                    itemText='Update'
                                    className='answer-update'
                                    onItemClick={closeMenu}
                                    modalComponent={<UpdateAnswerModal answer={answer} answerUpdated={handleAnswerUpdated}/>}
                                />

                                <OpenModalMenuItem
                                    itemText='Delete'
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteAnswerModal answerId={answer.id} answerDeleted={handleAnswerDeleted}/>}
                                />
                            </>: null
                        }
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ProfilePage
