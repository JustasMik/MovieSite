const selectedGenres = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SELECTED_GENRE': return [...state, action.payload]
        case 'ADD_MULTIPLE_SELECTED_GENRE': return [...state, ...action.payload]
        case 'REMOVE_SELECTED_GENRE': return state.filter(i => i !== action.payload)
        default: return state;
    }
}

export default selectedGenres