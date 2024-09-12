const GET_USER_ANSWERS = 'answers/getUserAnswers'
const DELETE_ANSWER = 'answers/deleteAnswer'

// Action Creators
const getUserAnswers = (answers) => ({
    type: GET_USER_ANSWERS,
    payload: answers
})

const deleteAnswer = (answer) => ({
    type: DELETE_ANSWER,
    payload: answer
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

export const deleteAnswerThunk = (answerId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            header: {'Content-Type': 'application/json'}
        }

        const res = await fetch(`/api/answers/${answerId}`, options)
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteAnswer(data));
        } else {
            throw res
        }
    } catch (error) {
        return error.json()
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
        case DELETE_ANSWER:
            newState = {...state};

            newState.allAnswers = newState.allAnswers.filter(answer => {
                answer.id !== action.payload.id;
            })

            delete newState.byId[action.payload.id]

            return newState
        default:
            return state
    }
}

export default answersReducer