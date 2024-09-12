import { useState } from 'react';
import * as followActions from '../../redux/following';
import './Follow.css';
import { useDispatch } from 'react-redux';

function FollowButton({questionId, following}) {
    const [isFollowing, setIsFollowing] = useState(following);
    const dispatch = useDispatch()

    const follow = (e) => {
      e.preventDefault();

      if (isFollowing) {
        dispatch(followActions.fetchUnfollow(questionId))
          .then(() => setIsFollowing(false));
      }
      else {
        dispatch(followActions.fetchFollow(questionId))
          .then(() => setIsFollowing(true));
      }
    }
  }

export default FollowButton
