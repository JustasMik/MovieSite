import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { addSelectedGenres, removeSelectedGenres, fetchedTvGenres, fetchedMovieGenres } from '../../Redux/Actions/filter';


const GenresComponent = (props) => {

    const location = useLocation()

    const currentPath = location.pathname.split('/')[1].toLowerCase();

    const setGenreObjectName = () => {
        switch (currentPath) {
            case 'movie': {
                return 'movieGenres'
            }
            case 'tv': {
                return 'tvGenres'
            }
            default: {
                return ''
            }
        }
    }

    const handleClick = (e) => {
        e.preventDefault()

        if ([...e.target.classList].includes('included')) {
            e.target.classList.remove("included");
            e.target.classList.add("excluded");

            e.target.setAttribute('title', 'Remove')

        } else if ([...e.target.classList].includes('excluded')) {
            e.target.classList.remove("excluded");
            e.target.setAttribute('title', 'Include')
        } else {
            e.target.classList.add("included");
            e.target.setAttribute('title', 'Exclude')
        }


        // document.getElementsByClassName('multi-selection genres')[0].classList.add('included')
    }

    let params = new URLSearchParams(location.pathname.toLowerCase().split('/')[2]); // skip /movies   




    const tvOrMovie = setGenreObjectName()

    const selectedGenres = useSelector(state => state.selectedGenres)

    const fetchedGenres = useSelector(state => state.fetchedGenres)

    const dispatch = useDispatch()


    const classNameGenre = (e) => {
        const main = 'multi-selection genres'

        const initialGenres = params.get('genres') ? params.get('genres').split(',') : ''
        const initialExcludedGenres = params.get('exclude_genres') ? params.get('exclude_genres').split(',') : ''
        

        const genreIncludedSelect = initialGenres.includes(`${e.id}`) ? 'included' : ''
        const genreExcludeSelect = initialExcludedGenres.includes(`${e.id}`) ? 'excluded' : ''

        return `${main} ${genreIncludedSelect ? genreIncludedSelect : genreExcludeSelect}`

    }

    const GenresList = () => {

        if (fetchedGenres[tvOrMovie]) {

            const handleGenreChange = (e) => {
                if (e.target.checked) {
                    dispatch(addSelectedGenres(e.target.value * 1))
                } else {
                    dispatch(removeSelectedGenres(e.target.value * 1))
                }
            }

            return (
                <div id='genreList' className='multi-selection'>

                    {/* {fetchedGenres[tvOrMovie].length > 0 ? fetchedGenres[tvOrMovie].map((e, i) => {
                        return <label key={e.id}>
                            <input
                                name='genreOption'
                                id={e.id}
                                checked={selectedGenres.find(item => e.id * 1 === item * 1) ? true : false}
                                onChange={e => { return handleGenreChange(e) }}
                                value={e.id}
                                className='multi-selection--input-hide'
                                type="checkbox"
                            />
                            <p className="multi-selection_text ">{e.name}</p>
                        </label>
                    }) : ''} */}



                    {fetchedGenres[tvOrMovie].length > 0 ? fetchedGenres[tvOrMovie].map((e, i) => { /// 
                        return <button
                            key={e.id}
                            name='genreOption'
                            id={e.id}
                            title="Include"

                            onClick={e => { return handleClick(e) }}
                            value={e.id}
                            className={'' + classNameGenre(e)}
                        >{e.name}</button>

                    }) : ''}


                </div>)
        } else {
            return ('')
        }
    }





    return (
        <>
            <GenresList />

        </>
    )
}

export default GenresComponent;