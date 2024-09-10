
const GET_QUESTIONS = 'tags/getAllQuestions'

// Action Creator
const getAllQuestions = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions
})

// Thunks
export const getAllQuestionsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/questions')
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }

            dispatch(getAllQuestions(data));
            return data
        } else {
            throw res
        }
    } catch (error) {
        const err = await error.json();
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
        case GET_QUESTIONS:
            newState = {...state};
            // All Tags
            newState.allQuestions = action.payload.Questions;

            // byId
            for (let question of action.payload.Questions) {
                newState.byId[question.id] = question;
            }

            return newState
        default:
            return state
    }
}

export default questionReducer
