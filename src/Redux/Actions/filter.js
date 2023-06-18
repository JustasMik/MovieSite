export const addSelectedGenres = (genres) => {
    return {
        type: 'ADD_SELECTED_GENRE',
        payload: genres
    }
}

export const addMultipleSelectedGenres = (genres) => {
    return {
        type: `ADD_MULTIPLE_SELECTED_GENRE`,
        payload: genres
    }
}

export const removeSelectedGenres = (genres) => {
    return {
        type: 'REMOVE_SELECTED_GENRE',
        payload: genres
    }
}
///// Keywords

export const addKeyword = (keywords) => {
    return {
        type: 'ADD_KEYWORD',
        payload: keywords
    }
}

export const addMultipeKeywords = (keywords) => {
    return {
        type: 'ADD_MULTIPLE_KEYWORDS',
        payload: keywords
    }
}

export const removeKeyword = (keywords) => {
    return {
        type: 'REMOVE_KEYWORD',
        payload: keywords
    }
}

///// score sliders

export const lowerScoreChanged = (props) => {
    return {
        type: 'LOWER_SCORE_CHANGED',
        payload: props
    }
}

export const higherScoreChanged = (props) => {
    return {
        type: 'HIGHER_SCORE_CHANGED',
        payload: props,
    }
}

/// add years


export const addYears = (props) => {
    return {
        type: 'ADD_YEARS',
        payload: props,
    }
}


//

export const fetchedMovieGenres = (genres) => {
    return {
        type: 'ADD_MOVIE_GENRES',
        payload: genres,
    }
}

export const fetchedTvGenres = (genres) => {
    return {
        type: 'ADD_TV_GENRES',
        payload: genres,
    }
}














