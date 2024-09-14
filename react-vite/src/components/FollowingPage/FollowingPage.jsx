import './FollowingPage.css';
import { fetchFollowings } from '../../redux/following';
import { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';

const Followings = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate(); Uncomment
    // const [showMenu, setShowMenu] = useState(false);
    // const ulRef = useRef();
    const followed = useSelector((state) => state.followingState.allFollowings);
    console.log(followed, '<-------')

    useEffect(() => {
        dispatch(fetchFollowings())
    }, [dispatch])

    return (
        <main className='followings'>
            <h1>Username</h1>
            <h2>All Saves</h2>
            <nav>
            {Object.values(followed).map(follow => {
                console.log(follow)
                return (
                    <NavLink key={follow.subject} to={`/questions/${follow.id}`}>
                        <div>
                            <h3>{follow.question}</h3>
                        </div>
                    </NavLink>
                )
            } )}
            </nav>
        </main>
    )
}
export default Followings
