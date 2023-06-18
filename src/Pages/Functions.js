import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchedMovieGenres, fetchedTvGenres } from '../Redux/Actions/filter';
import store from '../Redux/store'

const apiKey = '30224a8dd75f4b2496bd014e38e56116'

export const fetchGenres = () => {

    
    const fetchFunc = async () => { // fetch genres if they do not exist
        
        const { movieGenres, tvGenres } = store.getState().fetchedGenres
        if (!Object.keys(movieGenres).length) {  // check if object is empty
            console.log(!!Object.keys(movieGenres).length)
            console.log('asdasdasdaa')
            try {
                const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
                const genresItems = await data.json()

                store.dispatch(fetchedMovieGenres(genresItems.genres))
                //setGenres(genresItems.genres)
            } catch (e) {


            }
        }

        if (!Object.keys(tvGenres).length) {
            try {
                const data = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`)
                const genresItems = await data.json()

                store.dispatch(fetchedTvGenres(genresItems.genres))
                //setGenres(genresItems.genres)
            } catch (e) {


            }
        }
    }

    fetchFunc()
} 