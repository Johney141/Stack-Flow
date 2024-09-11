import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './ProfilePage.css'


const ProfilePage = () => {
    const [isLoaded, setIsLoaded] = useState();
    const user = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    

    return (
        <h1>Testing</h1>
    )
}

export default ProfilePage