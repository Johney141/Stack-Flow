const GET_USER_ANSWERS = 'answers/getUserAnswers'
const DELETE_ANSWER = 'answers/deleteAnswer'
const UPDATE_ANSWER = 'answers/updateAnswer'
const LOAD_COMMENTS = 'answers/loadComments'
const LOAD_COMMENT = 'answers/loadComment'
const EDIT_COMMENT = 'answers/editComment'
const DELETE_COMMENT = 'answers/deleteComment'

// Action Creators
const getUserAnswers = (answers) => ({
    type: GET_USER_ANSWERS,
    payload: answers
})

const deleteAnswer = (answer) => ({
    type: DELETE_ANSWER,
    payload: answer
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

/*const updateAnsewr = (answer) => ({
    type: UPDATE_ANSWER,
    payload, answer
})*/

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

export const createAnswer = (body) => async () => {
    const {question, subject} = body;
    const response = await fetch('/api/answers/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({question, subject})
    });
    const data = await response.json();
    console.log(data);

    if(response.ok) {
      return data.id;
    }
  };

export const fetchComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments/current`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllComments(data))
        return res
    }
};

export const fetchComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/answers/${id}/comments`)

    if (res.ok) {
        const data = await res.json()
        dispatch(comment(data))
        return res
    }
}

export const createComment = (answerId, payload) => async (dispatch) => {
    const res = await fetch(`/api/answers/${answerId}/comments`, {
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

export const deleteAnswerComment = (body) => async (dispatch) => {
    const {commentId} = body
    const res = await fetch(`/api/answers/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteComment(data))
        return data
    }
}

export const fetchEditComment = (body) => async (dispatch) => {
  const { comment, commentId } = body;
  const res = await fetch(`/api/answers/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({comment})
  })
  return res;
}
// Reducer
const initialState = {
    allAnswers: [],
    byId: {},
    answerComments: {}
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
        case LOAD_COMMENTS: {
            const updated = {
                ...state,
                answerComments: action.payload.AnswerComments.reduce(
                    (accumulator, comment) => {
                        accumulator[comment.id] = comment;

                        return accumulator;
                    },
                    {}
                ),
            };

            return updated;
        }

        case LOAD_COMMENT: {
            const updated =  {
                ...state,
                answerComments: {...state.answerComments,},
            };

            updated.answerComments[action.payload.id] = action.payload;

            console.log(LOAD_COMMENT, updated);

            return updated;
        }

        case DELETE_COMMENT: {
            const commentId = action.payload
            const newState = {...state}
            newState.answerComments ? {...newState.answerComments} : {}
            delete newState.answerComments[commentId]
            return newState;
        }
        default:
            return state
    }
}

export default answersReducer
