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
    console.log(followed, '<-------', '{}')
    useEffect(() => {
        dispatch(fetchFollowings())
    }, [dispatch])

    return (
        <main className='followings'>
            <h1>All Saves</h1>
            <nav>
            {Object.values(followed).map(follow => {
                return (
                    <div>
                        <NavLink key={follow.Question.subject} to={`/questions/${follow.Question.id}`}>
                        <div>
                            <h3 className='followings-subject'>{follow.Question.subject}</h3>
                        </div>
                    </NavLink>
                    <h4 className='followings-question'>{follow.Question.question}</h4>
                    </div>
                )
            } )}
            <div>
            </div>
            </nav>
        </main>
    )
}
export default Followings
