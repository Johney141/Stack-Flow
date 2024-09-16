const LOAD_USERS = 'users/loadUsers'

const getAllUsers = (payload) => ({
    type: LOAD_USERS,
    payload
})

export const fetchUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllUsers(data))
    }
}

const initialState = {allUsers: {}};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            newState = {...state};
            newState.allUsers = action.payload.users
            return newState
        }
        default:
            return state
    }
}

export default usersReducer
