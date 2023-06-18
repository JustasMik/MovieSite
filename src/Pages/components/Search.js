import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const apiKey = '30224a8dd75f4b2496bd014e38e56116'

//`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-USS&query=${searchText}&page=1&include_adult=false`

const FourZeroFour = () => {

    const [searchText, setSearchText] = useState('')
    const [fetchedSearch, setFetchedSearch] = useState([])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => { // give suggestions after something typed
        if (searchText.length > 1) {
            fetchSearch(searchText)
            console.log(searchText)
            console.log(fetchedSearch.map(e => (e.media_type === 'tv' || e.media_type === 'person') ? e.name : e.title))

            console.log(fetchedSearch)

        } else {
            setFetchedSearch([])
        }

    }, [searchText])


    const fetchSearch = async () => {
        const fetchData = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-USS&query=${searchText}&page=1&include_adult=false`)
        const data = await fetchData.json()

        setFetchedSearch(data.results)
    }

    const handleSearchClick = (e) => {
        console.log(e.target.value)
    }

    const handleSearchSumbmit = (e) => {
        e.preventDefault()

        window.location.replace(`/search/search=${searchText}`)
        console.log('submit')
    }

    return (
        <>

            <div className='search_form_content w-100'>
                        <FontAwesomeIcon icon="search" className='search-icon' />
                <form onSubmit={e => { return handleSearchSumbmit(e) } } className='w-100'>
                    <div className='multi-selection'>
                        <input
                            className='input--search-movies'
                            value={searchText}
                            onChange={e => { return handleSearchChange(e) }}
                            type="text"
                            placeholder="Search..."
                        />



                        <ul
                            // onMouseEnter={x => { return handleOnFocus2() }}
                            className='searchBox'>
                            {fetchedSearch.length > 0
                                ? fetchedSearch.map(e => {
                                    return <li
                                        key={e.id}
                                        value={e.id}
                                        onClick={e => { return handleSearchClick(e) }}
                                        className='searchItems' >{(e.media_type === 'tv' || e.media_type === 'person') ? e.name : e.title} <span> ({e.media_type})</span></li>
                                })

                                : <p className='searchItems'>No Results</p>}
                        </ul>


                    </div>

                </form>
            </div>



        </>)
}

export default FourZeroFour;