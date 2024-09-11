const GET_USER_ANSWERS = 'answers/getUserAnswers'

// Action Creators
const getUserAnswers = (answers) => ({
    type: GET_USER_ANSWERS,
    payload: answers
})
// Thunks
export const getUserAnswersThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/answers/current');
        if(res.ok) {
            const data = await res.json();
            if(data.errors) {
                throw data
            }

            dispatch(getUserAnswers(data))
            return data
        } else {
            throw res
        }
    } catch (error) {
        const err = error.json()
        return err
    }
}
// Reducer
const initialState = {
    allAnswers: [],
    byId: {}
}

const answersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_ANSWERS: 
            newState = {...state};
            // All Answers
            newState.allAnswers = action.payload.Answers;

            // byId
            for (let answer of action.payload.Answers) {
                newState.byId[answer.id] = answer
            }
            return newState

        default:
            return state
    }
}

export default answersReducer