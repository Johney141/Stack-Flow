
const GET_TAGS = 'tags/getAllTags'
// const GET_QUESTION_TAGS = 'tags/getQuestionTags';


// Action Creator
const getAllTags = (tags) => ({
    type: GET_TAGS,
    payload: tags
})

// const getQuestionTags = (tags) => ({
//     type: GET_QUESTION_TAGS,
//     payload: tags
// })

// Thunks
export const createTags = (body) => async () => {
  const {tags, questionId} = body;
  console.log(body);
  for(let tag of tags) {
    await fetch(`/api/tags/questions/${questionId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tagName: tag})
    });
  }
};

export const getAllTagsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/tags/')
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

export const getQuestionTagsThunk = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/tags/questions/${id}`)
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }
            return data
        } else {
            throw res
        }
    } catch (error) {
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
