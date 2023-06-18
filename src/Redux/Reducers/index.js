//import counter from './count'
import movieApi from './movieApi'
import filterScoreChange from './filter/score_change'
import fetchedGenres from './filter/genreApi'
import selectedGenres from './filter/selectedGenres'
import selectedKeywords from './filter/selectedKeywords'
import yearList from './filter/yearArray'

import { combineReducers, createStore } from 'redux'

const allReducers = combineReducers({
    movieApi,
    filterScoreChange,
    fetchedGenres,
    selectedGenres,
    selectedKeywords,
    yearList
})



export default allReducers;