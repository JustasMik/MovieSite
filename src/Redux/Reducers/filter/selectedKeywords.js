const selectedKeywords = (state = [], action) => {
    switch (action.type) {
        case 'ADD_KEYWORD': return state.some(x => x.id === action.payload.id) ? state : [...state, action.payload]
        case 'ADD_MULTIPLE_KEYWORDS': return [...state, ...action.payload]
        case 'REMOVE_KEYWORD': return state.filter(i => i.id !== action.payload.id)
        default: return state;
    }
}

export default selectedKeywords