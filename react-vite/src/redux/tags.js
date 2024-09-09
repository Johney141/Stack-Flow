
const GET_TAGS = 'tags/getAllTags'

// Action Creator
const getAllTags = (tags) => ({
    type: GET_TAGS,
    payload: tags
})

// Thunks
export const getAllTagsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/tags')
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }
    
            dispatch(getAllTags(data));
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
    allTags: [],
    byId: {}
}

const tagReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_TAGS:
            newState = {...state};
            // All Tags
            newState.allTags = action.payload.Tags;

            // byId 
            for (let tag of action.payload.Tags) {
                newState.byId[tag.id] = tag;
            }

            return newState
        default: 
            return state
    }
}

export default tagReducer