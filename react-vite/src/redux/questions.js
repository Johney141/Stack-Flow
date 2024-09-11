const GET_USER_QUESTIONS = 'questions/getUserQuestions'


// Action Creators
const getUserQuestions = (questions) => ({
    type: GET_USER_QUESTIONS,
    payload: questions
})
// Thunks
export const getUserQuestionsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/questions/current')
        if(res.ok) {
            const data = await res.json();
            if(data.errors) {
                throw data
            }
            
            dispatch(getUserQuestions(data));
            return data
        } else {
            throw res
        }


    } catch (error) {
        err = error.json()
        return err
    }
}
// Reducer
const initialState = { 
    allQuestions: [],
    byId: {}
}

const questionReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_QUESTIONS:
            newState = {...state};
            // All Questions 
            newState.allQuestions = action.payload.Questions;

            // byId 
            for (let question of action.payload.Questions) {
                newState.byId[question.id] = question
            }
            return newState

        default: 
            return state
    }
}

export default questionReducer