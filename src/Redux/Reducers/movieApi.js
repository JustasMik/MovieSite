const counter = (state = 0, action) => {
    switch (action.type) {
        case 'DECRAMENT': return state - 1
        case 'INCRAMENT': return state + 1
        default: return state;
    }
}

export default counter