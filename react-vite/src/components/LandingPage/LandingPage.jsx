import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTagsThunk } from "../../redux/tags";
import './LandingPage.css'

const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const tags = useSelector(state => state.tagState.allTags)
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div className="landing-container">
            <h1>Browse Questions by Category</h1>
            <div className="tag-container">
                {tags.map(tag => (
                    <div
                        key={tag.id}
                        className="tag-card"
                        onClick={() => navigate(`/questions/${tag.tagName}`)}
                    >
                        <h4>{tag.tagName}</h4>

                    </div>
                ))}
            </div>
        </div>

    )
}

export default LandingPage
