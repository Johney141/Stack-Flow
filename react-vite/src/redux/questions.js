// Action Creators

// Thunks
export const getUserQuestionsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/')
    } catch (error) {
        err = error.json()
        return err
    }
}
// Reducer