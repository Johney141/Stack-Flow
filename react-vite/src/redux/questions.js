// Action Types
const GET_QUESTIONS = 'tags/getAllQuestions'
const LOAD_COMMENTS = 'followings/loadComments'
const LOAD_COMMENT = 'followings/loadComment'
const EDIT_COMMENT = 'followings/editComment'
const DELETE_COMMENT = 'followings/deleteComment'
const GET_USER_QUESTIONS = 'questions/getUserQuestions'
const DELETE_QUESTION = 'questions/deleteQuestion'
const UPDATE_QUESTION = 'qustions/updateQuestion'

// Action Creators
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

const getUserQuestions = (questions) => ({
    type: GET_USER_QUESTIONS,
    payload: questions
})

const deleteQuestion = (question) => ({
    type: DELETE_QUESTION,
    payload: question
})

const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    payload: question
})

// Thunks
export const createQuestion = (body) => async () => {
  const {question, subject} = body;
  const response = await fetch('/api/questions/', {
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

export const getAllQuestionsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/questions')
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }

            dispatch(getAllQuestions(data));
            return res
        } else {
            throw res
        }
    } catch (error) {
        const err = await error;
        return err
    }
}

export const fetchComments = (id) => async (dispatch) => {
    const res = await fetch(`/api/questions/${id}/comments`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllComments(data))
        return res
    }
};

export const fetchComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(comment(data))
        return res
    }
}

export const createComment = (questionId, payload) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/comments`, {
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

export const deleteQuestionComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/questions/comments/${commentId}`, {
        method: 'DELETE'
    });
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
            return data
        } else {
            throw res
        }

    } catch (error) {
        const err = error.json();
        return err
    }
}

export const updateQuestionThunk = (questionId, body) => async (dispatch) => {
    try {
        const {question, subject} = body;
        const res = fetch(`/api/questions/${questionId}`,{
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({question, subject})
        });
        if(res.ok) {
            data = res.json();
            if(data.errors) {
                throw data
            }

            dispatch(updateQuestion(data))
            return data
        }

    } catch (error) {
        return error.json();
    }
}

// Reducer
const initialState = {
    allQuestions: [],
    byId: {},
    questionComments: {}
}

const questionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_QUESTIONS:
            newState = { ...state };
            // All Questions
            newState.allQuestions = action.payload.Questions;

            // byId
            console.log("action.payload: ", action.payload);
            for (let question of action.payload.Questions) {
                newState.byId[question.id] = question;
            }
            return newState;

        case GET_USER_QUESTIONS:
            newState = { ...state };
            // All User Questions
            newState.allQuestions = action.payload.Questions;

            // byId
            for (let question of action.payload.Questions) {
                newState.byId[question.id] = question;
            }
            return newState;

        case LOAD_COMMENTS: {
            const updated = {
                ...state,
                questionComments: action.payload.QuestionComments.reduce(
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
                questionComments: {...state.questionComments,},
            };

            updated.questionComments[action.payload.id] = action.payload;

            console.log(LOAD_COMMENT, updated);

            return updated;
        }

        case DELETE_COMMENT: {
            const commentId = action.payload
            const newState = {...state}
            newState.questionComments ? {...newState.questionComments} : {}
            delete newState.questionComments[commentId]
            // newState = { ...state,
            //     questionComments: {...state.questionComments}
            // };

            // newState.questionComments = newState.questionComments.filter(
            //     (comment) => comment.id !== action.payload.id
            // );

            // delete newState.byId[action.payload.id];

            return newState;
        }

        case DELETE_QUESTION: {
            newState = { ...state };

            newState.allQuestions = newState.allQuestions.filter(
                (question) => question.id !== action.payload.id
            );

            delete newState.byId[action.payload.id];

            return newState;
        }

        case UPDATE_QUESTION: {
            newState = {...state};

            const updatedQuestions = newState.allQuestions.map(question => {
                if(question.id === action.payload.id) {
                    return action.payload;
                } else {
                    return question
                }
            })

            newState.allQuestions = updatedQuestions;
            newState.byId = {...newState.byId, [action.payload.id]: action.payload}

            return newState;
        }

        default:
            return state;
    }
}

export default questionReducer;
