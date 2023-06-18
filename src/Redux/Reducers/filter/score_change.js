const filterScore = (state = {lower: 0, higher: 10}, action) => {
    switch (action.type) {
        case 'LOWER_SCORE_CHANGED': return {...state, lower: action.payload}
        case 'HIGHER_SCORE_CHANGED': return {...state, higher: action.payload}
        default: return state;
    }
}

export default filterScore