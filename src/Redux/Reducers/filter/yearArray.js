const yearsArray = (state = [], action) => {
    switch (action.type) {
        case 'ADD_YEARS': return action.payload
        default: return state;
    }
}

export default yearsArray