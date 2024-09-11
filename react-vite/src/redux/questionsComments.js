//Will move this to the Questions redux file when it is created

const LOAD_COMMENTS = 'followings/loadComments'
const LOAD_COMMENT = 'followings/loadComment'
const EDIT_COMMENT = 'followings/editComment'
const DELETE_COMMENT = 'followings/deleteComment'

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
