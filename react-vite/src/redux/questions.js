
const GET_QUESTIONS = 'tags/getAllQuestions'
const LOAD_COMMENTS = 'followings/loadComments'
const LOAD_COMMENT = 'followings/loadComment'
const EDIT_COMMENT = 'followings/editComment'
const DELETE_COMMENT = 'followings/deleteComment'

// Action Creator
const getAllQuestions = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions
})

const getAllComments = (payload) => ({
    type: LOAD_COMMENTS,
    payload
})

const comment = (payload) => ({
    type: LOAD_COMMENT,
    payload
})

const editComment = (payload) => ({
    type: EDIT_COMMENT,
    payload
})

export const deleteComment = (payload) => ({
    type: DELETE_COMMENT,
    payload
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


export const fetchComments = () => async (dispatch) => {
    const res = await fetch('/api/questions/comments/current')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllComments(data))
    }
    return res
};

export const fetchComment = (payload, questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/saved`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(comment(data))
        }
        return res
}

export const fetchDeleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${commentId}/saved`, {
        method: 'DELETE'
    })
    return res
}

export const fetchEditComment = (payload, commentId) => async (dispatch) => {
    const res = await fetch(`/api/questions/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const edittedComment = await res.json();
        dispatch(editComment(edittedComment))
        return edittedComment
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
            return newState;
        
        case LOAD_COMMENTS: {
            console.log(action, '<--------')
            return {
                ...state,
                QuestionComments: action.payload.QuestionComments
            }
        }
        case LOAD_COMMENT: {
            if (!state[action.id]) {
                const newState = {
                    ...state,
                    [action.id]: action
                }
                return newState
            }
            return {...state}
        }
        case DELETE_COMMENT: {
            let newComments;
            const questionId = action.payload
            const data = {...state.allQuestions.QuestionComments}
            let comments = Object.values(data)
            let index;
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].id == questionId) index = i
            }
            comments.splice(index, 1)
            newComments = Object.assign({}, comments)
            return {...state, QuestionComments: newComments}
        }
        default:
            return state
    }
}

export default questionReducer
