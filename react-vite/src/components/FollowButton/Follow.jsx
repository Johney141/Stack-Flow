import { useState } from 'react';
import * as followActions from '../../redux/following';
import './Follow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function FollowButton({questionId}) {
  const {id} = useParams()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const user = sessionUser ? sessionUser.id : null
  const followings = useSelector(state => state.followingState.allFollowings)
  const alreadyFollowed = Object.values(followings).find(following => following.questionId === questionId)

  const follow = (e) => {
      e.preventDefault();

      if (alreadyFollowed) {
        Promise.all([
          dispatch(followActions.fetchUnfollow(questionId)),
          dispatch(followActions.fetchFollowings())
        ])
      }
      else {
        Promise.all([
          dispatch(followActions.fetchFollow(questionId)),
          dispatch(followActions.fetchFollowings())
        ])
      }
    }

  }

export default FollowButton
