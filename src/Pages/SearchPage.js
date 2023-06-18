import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from 'react-router-dom'
import MovieItem from './Movie_Item'
import { fetchGenres } from "./Functions";

const apiKey = '30224a8dd75f4b2496bd014e38e56116'

const SearchPage = () => {

    const location = useLocation()
    const { search } = useParams()
    const [fetchedSearch, setFetchedSearch] = useState([])




    useEffect(() => {

        const SearchText = search ? search.split('=') : ''


        const fetchSearch = async () => {
            const fetchData = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-USS&query=${SearchText[1]}&page=1&include_adult=false`)
            const data = await fetchData.json()

            setFetchedSearch(data.results.filter(x => x.media_type !== 'person'))
            //console.log(data.results.filter(x => x.media_type !== 'person'))

        }


        fetchSearch()

    }, [])


    console.log((fetchedSearch ? fetchedSearch.length > 0 : false))

    return (<>
        <div className='page-center'>
            <div className='column'>
                <div className='column_header'>
                    <div className='column-wrap'>
                        <span className='column_border_start'> </span>
                        <h3>Search</h3>
                        <span className='column_border_end'> </span>
                    </div>
                </div>
                {((fetchedSearch ? fetchedSearch.length > 0 : false)
                    ? <>
                        <div className="media_discover">
                            <div className='media_discover_wrapper'>
                                {fetchedSearch.map(item => {
                                    return <MovieItem props={item} key={item.id} />
                                    
                                })}
                            </div>
                        </div>

                        {/* <Pagination apiPages={movieApiTotalPages} /> */}
                    </>

                    :
                    <div className='content-area drag-off'>
                        <div className='content-area__wrapper'>
                            <p className='textInTheMiddle'></p>
                        </div>
                    </div>)
                }
            </div>

        </div>
    </>
    )
}

export default SearchPage;