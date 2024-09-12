
const LOAD_FOLLOWINGS = 'followings/loadFollowings'
const LOAD_FOLLOW = 'followings/loadFollow'
const LOAD_UNFOLLOW = 'followings/loadUnfollow'

const getAllFollowers = (payload) => ({
    type: LOAD_FOLLOWINGS,
    payload
})

const follow = (payload) => ({
    type: LOAD_FOLLOW,
    payload
})

export const unfollow = (payload) => ({
    type: LOAD_UNFOLLOW,
    payload
})

export const fetchFollowings = () => async (dispatch) => {
    const res = await fetch('/api/questions/saved/current')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllFollowers(data))
    }
    return res
};

export const fetchFollow = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/saved`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(follow(data))
        }
        return res
}

export const fetchUnfollow = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/saved`, {
        method: 'DELETE'
    })
    return res
}

const initialState = { allFollowings: {}};

const followingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWINGS: {
            console.log(action, '<------')
            newState = {...state};
            newState.allFollowings = action.payload.questions
            return newState
        }
        case LOAD_FOLLOW: {
            newState = {...state}
            return newState
        }
        case LOAD_UNFOLLOW: {
            let newFollowings;
            const questionId = action.payload
            const data = {...state.allFollowings.questions}
            let followings = Object.values(data)
            let index;
            for (let i = 0; i < followings.length; i++) {
                if (followings[i].id == questionId) index = i
            }
            followings.splice(index, 1)
            newFollowings = Object.assign({}, followings)
        }
        default:
            return state
    }
}

export default followingsReducer
