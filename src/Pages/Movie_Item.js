import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player/youtube'
import { useSelector } from 'react-redux';
import { fetchGenres } from '../Pages/Functions'


// // Only loads the YouTube player
// <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

{/* <button onClick={e => { return editItem()  }}> edit</button> */ }

const Movie_Item = (d) => {

    // props = MovieData ,  isMovie= tv or movie string
    const { props, isMovie } = d

    const fetchedGenres = useSelector(state => state.fetchedGenres) // redux state

    
    const [movieGenres, setMovieGenres] = useState([])
    
    const [trailerData, setTrailerData] = useState([]);
    const [isTrailerOn, setIsTrailerOn] = useState(false);
    const [currentTrailer, setCurrentTrailer] = useState([]);

    const [movieOrTv] = useState(isMovie
        ? isMovie
        : ((props ? (props.original_name && props.first_air_date) : false) ? 'tv' : 'movie'))

    const movieNameProperties = {
        title: (movieOrTv === 'movie') ? props.title : props.name, //
        release_date: (movieOrTv === 'movie') ? props.release_date : props.first_air_date //
    }


    useEffect(() => {

        if (!fetchedGenres) {  // fetch genres if not fetched

            fetchGenres()
        }

        const abortController = new AbortController();

        const fetchTrailer = async () => {

            try {
                const result = await (await fetch(`https://api.themoviedb.org/3/${movieOrTv}/${props.id}/videos?api_key=30224a8dd75f4b2496bd014e38e56116&language=en-US`, { signal: abortController.signal })
                ).json();

                // code omitted for brevity
                //console.log(result)
                setTrailerData(result.results);
            } catch (e) {
                //dispatch(requestFailed({ error: e.message }));
            }
        };

        fetchTrailer();

        return () => abortController.abort();

    }, []);


    useEffect(() => {

        let genres = props.genre_ids.length >= 1 
        ? props.genre_ids.map(x => fetchedGenres[`${movieOrTv}Genres`].length > 0 ? fetchedGenres[`${movieOrTv}Genres`].find(g => g.id === x) : '' ).filter(x => !!x) 
        : []

        setMovieGenres(genres)
    }, [fetchedGenres])

    const handleShowTrailer = () => {        // calls function from Movie_Search.js and sends all trailer links to it  
        // showTrailer(trailerData)
        setIsTrailerOn(true)
        setCurrentTrailer(trailerData[0].key)
    }
    
    const closeTrailers = () => {        // calls function from Movie_Search.js and sends all trailer links to it  
        // showTrailer(trailerData)
        setIsTrailerOn(false)
    }

    const changeTrailer = (props) => {      // override old trailer data to new
        setCurrentTrailer(props)
    }



    //const movieGenres = props.props.genre_ids.map(x => props.genres.find(g => g.id === x)); // converts genre ids into genre titles 

    // const movieGenres = (props ? props.genre_ids : false) ? props.genre_ids.map(x => fetchedGenres[`${movieOrTv}Genres`].find(g => g.id === x)).filter(x => !!x) : []; // converts genre ids into genre titles 


    const addDefaultSrc = (e) => {  // broken movie img src
        e.target.src = 'https://i.ibb.co/smtxSjw/Untitled.png'
    }

    return (
        <>
            {
                isTrailerOn ?
                    <div className='media-trailer-fullscreen'>
                        <div className='media-trailer-fullscreen-wrapper'>
                            <div className='media-trailer-fullscreen-options'>
                                {trailerData.map(data => { return <option key={data.key} value={data.key} onClick={e => { return changeTrailer(e.target.value) }}>{data.type}</option> })}
                            </div>
                            <ReactPlayer pip={false} loaded={0} played={0} key={`https://www.youtube.com/watch?v=${currentTrailer}`} url={`https://www.youtube.com/watch?v=${currentTrailer}`} />
                        </div>
                        <div onClick={e => { return closeTrailers() }} className='media-trailer-fullscreen-background'></div>
                    </div>
                    : ''
            }

            <div className='movie-list-style' >
                <div className='image--type-scalable'>
                    {props.backdrop_path
                        ? <img
                            className='image'
                            onError={addDefaultSrc}
                            src={'https://image.tmdb.org/t/p/w500'.concat(props.backdrop_path)} />

                        : props.poster_path
                            ? <img
                                className='image'
                                onError={addDefaultSrc}
                                src={'https://image.tmdb.org/t/p/w500'.concat(props.poster_path)} />

                            : <img
                                className='image'
                                src={'https://i.ibb.co/smtxSjw/Untitled.png'} />

                    }

                    {(trailerData ? trailerData.length > 0 : false) ?
                        <FontAwesomeIcon onClick={e => { return handleShowTrailer() }} icon={['far', 'play-circle']} className='movie-list-icons-trailer' size="2x" />
                        : ''}
                    <div className='media-backdrop-overlay-front'>
                        <p className='media-backdrop-title'>{movieNameProperties.title}<span> ({movieNameProperties.release_date ? movieNameProperties.release_date.split('-')[0] : ''})</span></p>
                    </div>
                    <div className='media-backdrop-overlay'>
                        <div className="overlay-text-overview">
                            {movieNameProperties.title}
                            <br />
                            <br />
                            {props.overview}
                            <br />
                            <br />
                            {movieGenres ? movieGenres.map(genr => <span className='media-backdrop-genres-text' key={genr.id}> {genr.name}</span>) : ''}
                        </div>

                    </div>
                </div>
                <div className='movie-list-bottom'>
                    <div className='movie-list-user-status'>
                        <FontAwesomeIcon icon="flag-checkered" className='movie-list-icons' size="sm" />
                        <FontAwesomeIcon icon="tv" className='movie-list-icons' size="sm" />
                        <FontAwesomeIcon icon="book" className='movie-list-icons' size="sm" />
                        <FontAwesomeIcon icon="trash-alt" className='movie-list-icons' size="sm" />
                        <FontAwesomeIcon icon="list" className='movie-list-icons' size="sm" />
                    </div>

                    <div className='movie-list-rating'>
                        <FontAwesomeIcon icon="star" className='movie-list-icons' size="sm" />
                        <span>{props.vote_average}</span>
                    </div>

                </div>

            </div>
        </>
    );

}

export default React.memo(Movie_Item);


