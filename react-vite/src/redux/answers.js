const GET_USER_ANSWERS = 'answers/getUserAnswers'
const DELETE_ANSWER = 'answers/deleteAnswer'
const UPDATE_ANSWER = 'answers/updateAnswer'

// Action Creators
const getUserAnswers = (answers) => ({
    type: GET_USER_ANSWERS,
    payload: answers
})

const deleteAnswer = (answer) => ({
    type: DELETE_ANSWER,
    payload: answer
})

const updateAnsewr = (answer) => ({
    type: UPDATE_ANSWER,
    payload, answer
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
            headers: {'Content-Type': 'application/json'}
        }

        const res = await fetch(`/api/answers/${answerId}`, options)
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteAnswer(data));
            return data
        } else {
            throw res
        }
    } catch (error) {
        return error.json()
    }
}
export const updateAnswerThunk = (answerId, body) => async (dispatch) => {
    try {
        const {answer} = body;

        const res = await fetch(`/api/answers/${answerId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({answer})
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(updateAnswer(data))
            return data
        } else {
            throw res
        }
    } catch (error) {
        return error
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

        case UPDATE_ANSWER:{
            newState = {...state};

            const updatedAnswers = newState.allAnswers.map(answer => {
                if(answer.id === action.payload.id) {
                    return action.payload;
                } else {
                    return answer
                }
            })

            newState.allAnswers = updatedAnswers;
            newState.byId = {...newState.byId, [action.payload.id]: action.payload}

            return newState;
        }
        default:
            return state
    }
}

export default answersReducer