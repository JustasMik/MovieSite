import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Score from './filter_components/Score'
import Keywords from './filter_components/Keywords'
import GenresComponent2 from './filter_components/Genres'
import ReleaseDate from './filter_components/Release_date_search'
import SeasonalSearch from './filter_components/Seasonal_search'
import TextJs from './filter_components/test'

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { lowerScoreChanged, higherScoreChanged, addSelectedGenres, removeSelectedGenres, addMultipleSelectedGenres, fetchedMovieGenres, fetchedTvGenres } from '../Redux/Actions/filter';

import { fetchGenres } from '../Pages/Functions'   // adds extra functions

const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()
const currentDay = new Date().getDate()

const sortValues = [
    {
        name: 'Popularity Descending',
        value: 'popularity.desc'
    },
    {
        name: 'Popularity Ascending',
        value: 'popularity.asc'
    },
    {
        name: 'Rating Descending',
        value: 'vote_average.desc'
    },
    {
        name: 'Rating Ascending',
        value: 'vote_average.asc'
    },
    {
        name: 'Votes Descending',
        value: 'vote_count.desc'
    },
    {
        name: 'Votes Ascending',
        value: 'vote_count.asc'
    },
    {
        name: 'Release Date Descending',
        value: 'release_date.desc'
    },
    {
        name: 'Release Date Ascending',
        value: 'release_date.asc'
    },
]


const Filter = () => {


    const [filterExpanded, setFilterExpanded] = useState(false);
    const [filterType, setFilterType] = useState()
    const myAbortController = new AbortController();
    const [urlKeywords, setUrlKeywords] = useState()
    const [filterValueSettings, setFilterValueSettings] = useState()
    const [currentSeason, setCurrentSeason] = useState()
    

    const selectedGenres = useSelector(state => state.selectedGenres, shallowEqual)
    //const fetchedGenres = useSelector(state => state.fetchedGenres, shallowEqual)
    //const selectedGenres = useSelector(state => state.selectedGenres, shallowEqual)
    //const fetchedGenres = useSelector(state => state.fetchedGenres, shallowEqual)
    //const selectedGenres = []
    const fetchedGenres = []

    const dispatch = useDispatch()

    // useLocation
    const location = useLocation();
    
    // useHistory
    let history = useHistory(); // allows to use router history instances for navigation
    
    //console.log('filter render')
    
    const currentPath = location.pathname.split('/')[1].toLowerCase();  // get current url location, movies or tv shows
    
    useEffect(() => {   //// fetch genres

        // const fetchGenres = async () => {

        //     const url = `https://api.themoviedb.org/3/genre/${currentPath       // descide what genres to fetch based on url, movies or tv shows
        //     ? (currentPath === 'movies' ? 'movie' : '') 
        //     : (currentPath === 'tv' ? 'tv' : '')  }
        //     /list?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US`

        //     try {  // fetch genre names with ids
        //         const data = await fetch(url, { signal: myAbortController.signal })
        //         const genreItems = await data.json()

        //         dispatch(fetchedMovieGenres(genreItems.genres))

        //     } catch (e) {
        //         if (!myAbortController.signal.aborted) {
        //             // dispatch(requestFailed({ error: e.message }));  // send warnings
        //         }
        //     }
        // }

        fetchGenres()


        initialFilterValues() // assaign filter values after url changed except for keywords and genres

        return () => {
            myAbortController.abort();  // prevents leaks by aborting fetch actions when comonent unmount
        };
    }, [location.pathname]);



    const initialFilterValues = () => {

        const filterValues = {
            page: {
                current: 'page=',
                tmdbUrl: 'page=',
                initialValue: '1',
            },
            sort: {
                current: 'sort_by=',
                tmdbUrl: 'sort_by=',
                initialValue: 'popularity.desc',
            },
            rating_gte: {
                current: 'rating_gte=',
                tmdbUrl: 'vote_average.gte=',
                initialValue: 0,
            },
            rating_lte: {
                current: 'rating_lte=',
                tmdbUrl: 'vote_average.lte=',
                initialValue: 10,
            },
            genres: {
                current: 'genres=',
                tmdbUrl: 'with_genres=',
                initialValue: '',
            },
            keywords: {
                current: 'keywords=',
                tmdbUrl: 'with_keywords=',
                initialValue: '',
            },
            date_gte: {
                current: 'date_gte=',
                tmdbUrl: 'primary_release_date.gte=',
                initialValue: '',
            },
            date_lte: {
                current: 'date_lte=',
                tmdbUrl: 'primary_release_date.lte=',
                initialValue: '',
            },
            search_type: {
                current: 'search_type=',
                tmdbUrl: 'primary_release_date.lte=',
                initialValue: 'none',
            },

        }
        //Object.values(filterValues) if needed to turn this var into array 

        let url = location.pathname.split('&')
        const filterSettings = url.map(u => u.split('=')).reduce((prev, current) => ({ ...prev, [current[0]]: current[1] }), {})
        setFilterValueSettings(filterSettings) // it allows other components outisde this function to access url filter settings

        const genreSelected = filterSettings.genres ? filterSettings.genres.split('%2C').map(Number).filter(x => !isNaN(x)) : ''

        console.log(filterSettings)

        setUrlKeywords(filterSettings.keywords ? filterSettings.keywords.split('%2C').map(Number) : '')

        let filterData = document.getElementById('filterFormId')

        filterData.sort.value = filterSettings.sort_by ? filterSettings.sort_by : filterValues.sort.initialValue
        filterData.searchType.value = filterSettings.search_type ? filterSettings.search_type : filterValues.search_type


        setFilterType(filterSettings ? filterSettings.search_type : '')

        dispatch(lowerScoreChanged(filterSettings.rating_gte ? filterSettings.rating_gte : filterValues.rating_gte.initialValue))
        dispatch(higherScoreChanged(filterSettings.rating_lte ? filterSettings.rating_lte : filterValues.rating_lte.initialValue))



        if (genreSelected ? genreSelected.every(x => selectedGenres.includes(x)) : false) {     // avoid initial genre duplicates. checks every genre id from url to redux selectedGenres state
        } else {
            dispatch(addMultipleSelectedGenres(genreSelected)) // sets genres from url to redux state
        }

    }


    const FilterTypeComponent = useCallback(() => {
        switch (filterType) {
            case 'release-date-search':
                return (<>
                    {/* <TextJs /> */}
                    <ReleaseDate date_gte={filterValueSettings.date_gte} date_lte={filterValueSettings.date_lte} handleSubmit={e => { return handleSubmit(e) }} />
                </>
                )
            case 'seasonal-search':
                return (<>
                    {/* <TextJs /> */}
                    <SeasonalSearch setCurrentSeason={e => setCurrentSeason(e)} handleSubmit={e => { return handleSubmit(e) }} />
                </>
                )
            default:
                return (
                    <></>
                )
        }

    }, [filterType])
    ///////////////////////////////////////


    // initial sort filter names and values

    const checkSeason = (month) => { // reusebale function for checking what season

        let season = ''

        if (month === 12 || month === 1 || month === 2) {
            season = `winter`
        } else if (month === 3 || month === 4 || month === 5) {
            season = `spring`
        } else if (month === 6 || month === 7 || month === 8) {
            season = `summer`
        } else if (month === 9 || month === 10 || month === 11) {
            season = `fall`
        }
        return season
    }


    const handleFilterClick = () => {       // if search details pressed show all search filters
        setFilterExpanded(!filterExpanded)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const releaseDateSearch = document.getElementById('releaseDateSearchId')  /// get realease date search form if exists
            ? document.getElementById('releaseDateSearchId').getElementsByClassName('select-c')
            : '' //

        const filterData = document.getElementById('filterFormId') // get genres,sort,keywords,rating

        const addZero = (n) => `${n}`.length > 1 ? `${n}` : `0${n}` // function for adding zero if number is one digit ex 1 = 01

        // const genreList = [...filterData.genreOption]      // convert dom to array
        // const getAllCheckGenres = genreList.filter(x => x.checked === true).map(x => x.value)


        const getAllKeywords = filterData.keywords
            ? [filterData.keywords].map(x => x.value
                ? [x.value] : [...x].map(i => i.value))[0]
            : '' // get inputs with name 'keywords' check if it exists, convert to array and reasaign values



        let sortUrl = (filterData.sort.value ? filterData.sort.value !== 'popularity.desc' : false) ? `&sort_by=${filterData.sort.value}` : ''
        let searchTypeUrl = (filterData.searchType.value ? filterData.searchType.value !== 'none' : false) ? `&search_type=${filterData.searchType.value}` : ''
        let ratingGteUrl = (filterData.vote_average_gte.value ? filterData.vote_average_gte.value * 1 > 0 : false) ? `&rating_gte=${filterData.vote_average_gte.value}` : ''
        let ratingLteUrl = (filterData.vote_average_lte.value ? filterData.vote_average_lte.value * 1 < 10 : false) ? `&rating_lte=${filterData.vote_average_lte.value}` : ''
        
        let includedGenres = [...document.getElementsByClassName('multi-selection genres included')].length > 0
        ? `&genres=${[...document.getElementsByClassName('multi-selection genres included')].map(x => x.value).join('%2C')}`
        : ''

        let excludedGenres = [...document.getElementsByClassName('multi-selection genres excluded')].length > 0
        ? `&exclude_genres=${[...document.getElementsByClassName('multi-selection genres excluded')].map(x => x.value).join('%2C')}`
        : ''
        
        //let genresUrl = selectedGenres.length > 0 ? `&genres=${selectedGenres.join('%2C')}` : ''
        let keywordsUrl = getAllKeywords.length > 0 ? `&keywords=${getAllKeywords.join('%2C')}` : ''


        let dateGteUrl = ''
        let dateLteUrl = ''
        let seasonUrl = ''

        // const seasonSearch = document.getElementById('seasonSearchId')  /// get season search form if exists
        //     ? document.getElementById('seasonSearchId')
        //     : '' //  

        if (filterData.searchType.value) {
            switch (filterData.searchType.value) {
                case 'release-date-search': {
                    dateGteUrl = releaseDateSearch.fromYear // get current release date from filter
                        ? `&date_gte=${releaseDateSearch.fromYear.value}-${addZero(releaseDateSearch.fromMonth.value)}-${addZero(releaseDateSearch.fromDay.value)}`
                        : `&date_gte=${currentYear * 1 - 1}-01-01`
                    dateLteUrl = releaseDateSearch.toYear
                        ? `&date_lte=${releaseDateSearch.toYear.value}-${addZero(releaseDateSearch.toMonth.value)}-${addZero(releaseDateSearch.toDay.value)}`
                        : `&date_lte=${currentYear}-01-01`
                }
                case 'seasonal-search': {
                    seasonUrl = filterData.searchType.value === 'seasonal-search' ? `&season=${checkSeason(currentMonth)}-${currentYear}` : ''
                    console.log(filterData.season)
                }
                default: { }
            }
        }

        //let dateGteUrl = `&date_gte=${releaseDateSearch.fromYear.value}-${addZero(releaseDateSearch.fromMonth.value)}-${addZero(releaseDateSearch.fromDay.value)}`
        //let dateLteUrl = `&date_lte=${releaseDateSearch.toYear.value}-${addZero(releaseDateSearch.toMonth.value)}-${addZero(releaseDateSearch.toDay.value)}`

        const url = [sortUrl, searchTypeUrl, seasonUrl, ratingGteUrl, ratingLteUrl, keywordsUrl, includedGenres, excludedGenres, dateGteUrl, dateLteUrl].join('')

        // switch (filterData.searchType.value) {
        //     case 'release-date-search': {
        //         dateGteUrl = releaseDateSearch.fromYear // get current release date from filter
        //             ? `&date_gte=${releaseDateSearch.fromYear.value}-${addZero(releaseDateSearch.fromMonth.value)}-${addZero(releaseDateSearch.fromDay.value)}`
        //             : ''
        //         dateLteUrl = releaseDateSearch.toYear
        //             ? `&date_lte=${releaseDateSearch.toYear.value}-${addZero(releaseDateSearch.toMonth.value)}-${addZero(releaseDateSearch.toDay.value)}`
        //             : ''
        //     }
        //     case 'seasonal-search': {
        //         return seasonUrl = currentSeason ? `&season=${currentSeason}` : ''
        //     }
        //     default: { }
        // }


        history.push(`/${currentPath}/&page=${1}${url}`); // on submit add movie/(the filter url)


        setFilterExpanded(false)

    }

    return (
        <>
            <div className='content-area drag-off'>
                <div className='content-area__wrapper whiteBackground filter'>
                    <div onClick={e => { return handleFilterClick(e.target) }} className='filter_search'>
                        <p className='filter_panel_title'>Search Details</p>
                        <FontAwesomeIcon style={{ transform: `rotateZ(${filterExpanded ? 90 : 0}deg)` }} icon="chevron-right" className='filter_icon_arrow' />
                    </div>
                    <form
                        id='filterFormId'
                        onSubmit={x => { return handleSubmit(x) }}
                        style={filterExpanded ? { display: 'block' } : { display: 'none' }}
                        className='filter_form'
                    >


                        <div className='filter_panel_search_details'>
                            <p className='filter_panel_details_title'>Sort</p>

                            <div className='Select-master-div'>
                                <div className='wrapper'>
                                    <FontAwesomeIcon icon="chevron-right" className='icon' />
                                    <select className='select-c' id="sort" name="sort">
                                        {sortValues.map(x => { return <option key={x.value} value={x.value}>{x.name}</option> })}
                                    </select>
                                </div>
                            </div>


                        </div>

                        <div className='filter_panel_search_details'>
                            <p className='filter_panel_details_title'>Genres</p>

                            {/* <GenresComponent /> */}

                            <GenresComponent2 />

                        </div>



                        <div className='filter_panel_search_details'>
                            <p className='filter_panel_details_title'>Score</p>
                            <Score />
                        </div>



                        <div className='filter_panel_search_details'>
                            <p className='filter_panel_details_title'>Keywords</p>

                            {/* <Keywords keywordsFromUrl={urlKeywords}/> */}
                            <Keywords keywordsFromUrl={urlKeywords} />

                        </div>

                        <div className='filter_panel_search_details'>
                            <p className='filter_panel_details_title'>Search types</p>


                            <label className="radio">None
                        <input defaultChecked type="radio" value='none' name="searchType" />
                                <span className="radio--checkmark"></span>
                            </label>

                            <label className="radio">Release date search
                        <input type="radio" value='release-date-search' name="searchType" />
                                <span className="radio--checkmark"></span>
                            </label>

                            <label className="radio">Seasonal search
                        <input type="radio" value='seasonal-search' name="searchType" />
                                <span className="radio--checkmark"></span>
                            </label>



                        </div>


                        <input className='button--big-red' type='submit' value='Search' />

                    </form>


                </div>
            </div>
            {/* <SeasonalSeaech /> */}

            <FilterTypeComponent />

            {/* <ReleaseDate date_gte={() => filterValueSettings.date_gte} date_lte={() => filterValueSettings.date_lte} handleSubmit={e => {return handleSubmit(e)}}/> */}
        </>
    )
}

export default Filter;