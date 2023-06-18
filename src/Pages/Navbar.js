import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchedMovieGenres, fetchedTvGenres } from '../Redux/Actions/filter';
import { useDispatch } from 'react-redux';
import Filter from './Filter'
import Search from './components/Search'


const Navbar = () => {

    const location = useLocation()

    const [isFilterOn, setIsFilterOn] = useState(false);

    const [isFilterBtnDisabled, setIsFilterBtnDisabled] = useState()

    const filterIsPressed = (props) => {
        setIsFilterOn(!isFilterOn)
    }


    useEffect(() => {

        let params = location.pathname.toLowerCase().split('/').length >= 3
            ? location.pathname.toLowerCase().split('/')[2].split('&').filter(x => x).map(x => x.split('=')).reduce(function (obj, value) {
                obj[value[0]] = value[1];      // turn url to object like ex. page: 1, date_gte: 1996-04-21
                return obj
            }, {})
            : '';

        switch (location.pathname.split('/')[1].toLowerCase()) {
            case 'movie': {
                if (params['search_type']) {
                    setIsFilterOn(true)
                }

                return setIsFilterBtnDisabled(false)
            }
            case 'tv': {
                if (params['search_type']) {
                    setIsFilterOn(true)
                }
                return setIsFilterBtnDisabled(false)
            }
            default: {
                setIsFilterOn(false)
                return setIsFilterBtnDisabled(true)
            }
        }

    }, [location.pathname])

    const dispatch = useDispatch()


    useEffect(() => {
        const abortController = new AbortController();

        const fetchGenres = async () => { // get genres ids

            try {
                const data = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US", { signal: abortController.signal })
                const genresItems = await data.json()

                dispatch(fetchedMovieGenres(genresItems.genres))
                //setGenres(genresItems.genres)
            } catch (e) {


            }

            try {
                const data = await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US", { signal: abortController.signal })
                const genresItems = await data.json()

                dispatch(fetchedTvGenres(genresItems.genres))
                //setGenres(genresItems.genres)
            } catch (e) {


            }
        }

        fetchGenres()

        return () => abortController.abort();

    }, [])

    return (
        <div className='page-center'>
            <div className='column'>
                <div className='column_header'>
                    <div className='search_form'>
                    
                        <Search />

                        <button disabled={isFilterBtnDisabled} onClick={e => { return filterIsPressed(e.target) }} className={isFilterOn ? "filter_button active" : "filter_button"}>
                            <FontAwesomeIcon
                                icon="sliders-h"
                                className='icon' />
                        </button>
                    </div>


                </div>
            </div>

            {isFilterOn ? <Filter /> : ''}

        </div>
    )
}

export default Navbar;