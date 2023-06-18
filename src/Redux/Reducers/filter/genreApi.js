const genreApi = (state = {movieGenres: {}, tvGenres: {}}, action) => {
    switch (action.type) {
        case 'ADD_MOVIE_GENRES': return {...state, movieGenres: action.payload}
        case 'ADD_TV_GENRES': return {...state, tvGenres: action.payload}
        default: return state;
    }
}

export default genreApi