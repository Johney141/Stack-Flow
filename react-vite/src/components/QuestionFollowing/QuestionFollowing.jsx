import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchFollowings } from "../../redux/following";

const FollowingList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFollowings())
            .then(() => setIsLoaded(true));

    }, [isLoaded, dispatch])

    if(!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }
    console.log(state)
    return (
        <div className="following-list">
            list
        </div>

    )
}

export default FollowingList
