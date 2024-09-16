import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './ProfilePage.css'
import { getUserQuestionsThunk } from "../../redux/questions";
import { getUserAnswersThunk } from "../../redux/answers";
import { fetchUsers } from "../../redux/users";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteAnswerModal from "../DeleteAnswerModal/DeleteAnswerModal";
import DeleteQuestionModal from "../DeleteQuestionModal/DeleteQuestionModal";
import UpdateAnswerModal from "../UpdateAnswerModal/UpdateAnswerModal";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestoinModal";


const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [answerDeleted, setAnswerDeleted] = useState(false);
    const [questionDeleted, setQuestionDeleted] = useState(false);
    const [answerUpdated, setAnswerUpdated] = useState(false);
    const [questionUpdated, setQuestionUpdated] = useState(false);
    const {userId} = useParams();
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const questions = useSelector((store) => store.questionState.allQuestions);
    const answers = useSelector((store) => store.answerState.allAnswers);
    const allUsers = useSelector((store) => store.userState.allUsers);

    const isUsersProfile = (user) && (userId == user.id);

    console.log(allUsers);



    useEffect(() => {
        const getUserData = async () => {
            await dispatch(getUserQuestionsThunk());
            await dispatch(getUserAnswersThunk());
            await dispatch(fetchUsers());
            setIsLoaded(true);
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

    return (isUsersProfile ? (

        <div className="profile-page-container">
            <h2>{`Welcome to your profile, ${user.username}!`}</h2>

            <h3>Questions</h3>
            <div className="questions-container">
                {questions.map(question => (
                    <div
                        className="user-question"
                        key={question.id}
                        >
                        <div
                            onClick={() => navigate(`/questions/${question.id}`)}
                            className="question-anchor"
                        >{question.subject}</div>
                        <div>{question.question}</div>
                        {isUsersProfile ?
                            <div className='user-modify-button'>
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
                            </div>: null
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
                        <p>{answer.answer}</p>
                        <div className='user-modify-button'>
                          <button
                            type="button"
                            onClick={() => navigate(`/questions/${answer.questionId}`)}>
                            Go To Question
                          </button>
                        {isUsersProfile ?

                            <>
                                <OpenModalMenuItem
                                    itemText='Update'
                                    onItemClick={closeMenu}
                                    modalComponent={<UpdateAnswerModal answer={answer} answerUpdated={handleAnswerUpdated}/>}
                                />

                                <OpenModalMenuItem
                                    itemText='Delete'
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteAnswerModal answerId={answer.id} answerDeleted={handleAnswerDeleted}/>}
                                />
                            </>
                            : null
                        }
                        </div>
                    </div>
                ))}
            </div>
        </div>

    ) : <div className="profile-page-container"><h2>403 Forbidden</h2></div>)
}

export default ProfilePage
