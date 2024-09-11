const GET_USER_QUESTIONS = 'questions/getUserQuestions'
const DELETE_QUESTION = 'questions/deleteQuestion'


// Action Creators
const getUserQuestions = (questions) => ({
    type: GET_USER_QUESTIONS,
    payload: questions
})

const deleteQuestion = (question) => ({
    type: DELETE_QUESTION,
    payload: question
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
        const err = error.json()
        return err
    }
}

export const deleteQuestionThunk =(questionId) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            header: {'Content-Type': 'application/json'}
        }
        const res = await fetch(`/api/questions/${questionId}`, options)

        if (res.ok) {
            const data = await res.json();
            dispatch(deleteQuestion(data));
        } else {
            throw res
        }

    } catch (error) {
        const err = error.json();
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
        case DELETE_QUESTION: 
            newState = {...state};

            newState.allQuestions = newState.allQuestions.filter(question => {
                question.id !== action.payload.id
            })

            delete newState.byId[action.payload.id]

            return newState
        default: 
            return state
    }
}

export default questionReducer