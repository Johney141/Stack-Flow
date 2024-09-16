import { useEffect, useState } from "react";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTagsThunk } from "../../redux/tags";
import QuestionCreatePage from "../QuestionCreatePage/QuestionCreatePage";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './LandingPage.css'

const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const tags = useSelector(state => state.tagState.allTags)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        const getTags = async () => {
            await dispatch(getAllTagsThunk())
            setIsLoaded(true);
        }

        if(!isLoaded) {
            getTags();
        }
    }, [isLoaded, dispatch])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }
    console.log(tags)

    return (
        <div className="landing-container tag-page">
            <h1>Browse Questions by Category</h1>
            <div className='landing-button'>
            <OpenModalMenuItem
              itemText="Add a question"
              onItemClick={closeMenu}
              modalComponent={user ? <QuestionCreatePage/> : <LoginFormModal/>}
            />
            </div>
            <div className="tag-container tag-list">
                {tags.map(tag => {
                      return (
                        <div className="tag-anchor" onClick={() => navigate(`/tags/${tag.id}`)}>
                          <p>#{tag.tagName}</p>
                          <p className="tag-numQuestion">Number of Questions: {tag.numQuestions}</p>
                        </div>
                      );
                })}
            </div>
        </div>

    )
}

export default LandingPage
