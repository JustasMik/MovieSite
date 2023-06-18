import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from 'react-router-dom'
import MovieItem from './Movie_Item'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pages/components/Pagination';

import { fetchGenres } from '../Pages/Functions'   // adds extra functions


const currentMonth = new Date().getMonth() + 1
const apiKey = 'api_key=30224a8dd75f4b2496bd014e38e56116'

const MovieSearch = () => {

    //const renders = useRef(0)
    //console.log(renders.current++)

    const [movieApi, setMovieApi] = useState('')
    const [currentApiPage, setCurrentApiPage] = useState('')

    const [movieApiTotalPages, setMovieApiTotalPages] = useState('')

    const [createdApi, setCreatedApi] = useState('')

    const [items, setItems] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchedGenres = useSelector(state => state.fetchedGenres)
    const dispatch = useDispatch()

    const location = useLocation()
    const { filter } = useParams()


    const getCurrentPage = () => { // get page= value
        let pageNumberQuery = new URLSearchParams(location.pathname);
        setCurrentApiPage((pageNumberQuery.get('page')) ? pageNumberQuery.get('page') : 1)
        return (pageNumberQuery.get('page')) ? pageNumberQuery.get('page') : 1
    }

    useEffect(() => {


        //getCurrentPage()

        fetchMovies(3, getCurrentPage())


        fetchGenres(fetchedGenres)

        return (() => {

        })
    }, [movieApi]);


    useEffect(() => {
        extractFilterSettings()
    }, [location.key]);


    // const handleMovieApi = () => {
    //     const path = location.pathname.split('/');  // get path for movies or tv shows
    //     switch (path[1]) {
    //         case 'movies': { return setMovieApi(`https://api.themoviedb.org/3/discover/movie?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2016`) }
    //         case 'tv': { return setMovieApi(`https://api.themoviedb.org/3/discover/movie?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2015`) }
    //         default:
    //     }

    //     console.log('handle api')
    // }


    const fetchMovies = (repetition, currentaPage) => {

        let items = []
        let currentRep = 1


        let getTotal = []
        let prepareList = []

        let controller = new AbortController()

        const requiredMoviesUrl = `https://api.themoviedb.org/3/discover/movie?${apiKey}&language=en-US&include_adult=false&include_video=false`
        const requiredTvUrl = `https://api.themoviedb.org/3/discover/tv?${apiKey}&language=en-US&timezone=America%2FNew_York&include_null_first_air_dates=false`

        
        const setUrl = () => {
            switch (location.pathname.split('/')[1].toLowerCase() ) {
                case 'movie': {
                    return requiredMoviesUrl
                }
                case 'tv': {
                    return requiredTvUrl
                }
                default: {
                    return ''
                }
            }
        }
        
        const url = setUrl()



        // fetch movies number of times based on repetition input
        const fetchUntilCondition = () => {
            if (movieApi) {

                setIsLoading(true);
                //console.log([url, movieApi, `&page=${currentRep + Math.abs((Math.ceil(currentaPage * 1 * repetition * 1 - repetition)))}`].join(''))
                fetch([url, movieApi, `&page=${currentRep + Math.abs((Math.ceil(currentaPage * 1 * repetition * 1 - repetition)))}`].join(''), { signal: controller.signal })


                    .then(res => res.json())
                    .then(res => {

                        if (currentRep <= repetition && res.page <= res.total_pages) {
                            currentRep = currentRep + 1
                            items.push(res)
                            fetchUntilCondition(); // fetch again
                        } else {
                            
                            //getTotal = items[0] ? items[0].total_pages : 1
                            prepareList = items.map(x => {
                                getTotal = x.total_pages
                                return x.results
                            }).reduce((acc, obj) => [...acc, ...obj], [])


                        }
                        setMovieApiTotalPages(
                            {
                                total: getTotal,
                                repetition: repetition
                            })
                        setItems(prepareList)


                        console.log(movieApiTotalPages, 'total pages')


                        setIsLoading(false)
                    }
                    );

            }
        }
        fetchUntilCondition();

        return (() => {
            controller.abort();
        })
    }




    ///////////// get current location url, convert its infomation to api and assign to new movie api

    useEffect(() => {
  
        if (createdApi) {   // 
            //setMovieApi([requiredUrl, createdApi].join(''))
            setMovieApi(createdApi)
        }

    }, [createdApi])



    const extractFilterSettings = () => {   // when location id changed this called. converts url to api

        const filterValues = [
            {
                current: 'page',
                tmdbUrl: 'page',
                defaultValue: 'page=1',
            },
            {
                current: 'sort_by',
                tmdbUrl: 'sort_by',
                defaultValue: 'sort_by=popularity.desc',
            },
            {
                current: 'rating_gte',
                tmdbUrl: 'vote_average.gte',
                defaultValue: 'vote_average.gte=0',
            },
            {
                current: 'rating_lte',
                tmdbUrl: 'vote_average.lte',
                defaultValue: 'vote_average.lte=10',
            },
            {
                current: 'genres',
                tmdbUrl: 'with_genres',
                defaultValue: '',
            },
            {
                current: 'exclude_genres',
                tmdbUrl: 'without_genres',
                defaultValue: '',
            },
            {
                current: 'keywords',
                tmdbUrl: 'with_keywords',
                defaultValue: '',
            },
            {
                current: 'date_gte',
                tmdbUrl: 'primary_release_date.gte',
                defaultValue: '',
            },
            {
                current: 'date_lte',
                tmdbUrl: 'primary_release_date.lte',
                defaultValue: '',
            },
            {
                current: 'season',
                tmdbUrl: 'season',
                defaultValue: '',
            },

        ]

        const getSeasonDate = (selectedSeason) => {

            let tvOrMovie = location.pathname.split('/')[1].toLowerCase()

            let season = selectedSeason.toLowerCase().split('-') // [0] season [1] year

            let date_gte
            let date_lte 
            
            // Spring: 21 March to 20 June
            // Summer: 21 June to 20 September
            // Autumn: 21 September to 20 December
            // Winter: 21 December to 20 March

            if (season[0] === `winter`) {       /// defined by astronomers
                date_gte = `${season[1]}-12-21`
                date_lte = `${season[1]*1 +1}-03-20`

            } else if (season[0] === `spring`) {
                date_gte = `${season[1]}-03-21`
                date_lte = `${season[1]}-06-20`

            } else if (season[0] === `summer`) {
                date_gte = `${season[1]}-06-21`
                date_lte = `${season[1]}-09-20`

            } else if (season[0] === `fall`) {
                date_gte = `${season[1]}-09-21`
                date_lte = `${season[1]}-12-20`
            }

            
            if(tvOrMovie === 'movie'){
                return `&primary_release_date.gte=${date_gte}&primary_release_date.lte=${date_lte}`
            }else if (tvOrMovie === 'tv'){
                console.log(`&first_air_date.gte=${date_gte}&first_air_date.lte=${date_lte}`)
                return `&first_air_date.gte=${date_gte}&first_air_date.lte=${date_lte}`
            }else {
                return ''
            }

        }
        
        const getReleaseDate = (date, filterName) => {
            let tvOrMovie = location.pathname.split('/')[1].toLowerCase()
            let endPrefix = filterName.split('_')[1]

            if(tvOrMovie === 'movie'){
                return `&primary_release_date.${endPrefix}=${date}`
            }else if (tvOrMovie === 'tv'){
                return `&first_air_date.${endPrefix}=${date}`
            }else {
                return ''
            }
        }

        setCreatedApi(filter)

        let params = filter ? location.pathname.toLowerCase().split('/')[2].split('&').filter(x => x).map(x => x.split('=')).reduce(function(obj, value) {
            obj[value[0]] = value[1];      // turn url to object ex. page: 1,
            return obj
       }, {}) : '';

        let convertUrlToApi = filterValues.map(f => {
            switch (f.current){
                case 'date_gte': return params[f.current] ? getReleaseDate(params[f.current], f.current) : ''
                case 'date_lte': return params[f.current] ? getReleaseDate(params[f.current], f.current) : ''
                case 'season': return params[f.current] ? getSeasonDate(params[f.current]) : ''
                default: return  params[f.current] ? `&${f.tmdbUrl}=${params[f.current]}` : ''
            }
        } ).filter(x => x).join('')

        console.log(convertUrlToApi)
       
        return setCreatedApi(convertUrlToApi)
        
        //return filter ? filterValues.map(i => setCreatedApi(x => x.replace(i.current, i.tmdbUrl))) : ''

    }


    ///////////////


    // const fetchGenres = async () => { // get genres ids

    //     if (fetchedGenres.movieGenres)
    //         try {
    //             const data = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US")
    //             const genresItems = await data.json()

    //             dispatch(fetchedMovieGenres(genresItems.genres))
    //             //setGenres(genresItems.genres)
    //         } catch (e) {


    //         }

    //     if (fetchedGenres.tvGenres)
    //         try {
    //             const data = await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US")
    //             const genresItems = await data.json()

    //             dispatch(fetchedTvGenres(genresItems.genres))
    //             //setGenres(genresItems.genres)
    //         } catch (e) {


    //         }
    // }




    return (
        <>

        {/* {items ? items.map(x => <div key={x.id}>{x.original_name}</div>) : '' } */}
            {!isLoading
                ? ((items ? items.length > 0 : false)
                    ? <>
                        <div className="media_discover">
                            <div className='media_discover_wrapper'>
                                {items.map(item => {
                                    return <MovieItem props={item} key={item.id} genres={fetchedGenres.movieGenres}  />
                                })}
                            </div>
                        </div>

                        <Pagination apiPages={movieApiTotalPages} />
                    </>

                    :
                    <div className='content-area drag-off'>
                        <div className='content-area__wrapper'>
                            <p className='textInTheMiddle'></p>
                        </div>
                    </div>)
                : <div className='loader'> </div>

            }

        </>
    );
}

export default MovieSearch;