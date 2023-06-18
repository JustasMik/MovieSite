import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addKeyword, addMultipeKeywords, removeKeyword } from '../../Redux/Actions/filter';


const Keywords = (props) => {

    const [keywordValue, setKeywordValue] = useState('')
    const [fetchedKeywords, setFetchedKeywords] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const location = useLocation()

    const dispatch = useDispatch()

    const keywordsList = useSelector(state => state.selectedKeywords)


    const fetchKeywords = async (keyword) => {
        const fetchData = await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=30224a8dd75f4b2496bd014e38e56116&query=${keyword}&page=1`)
        const data = await fetchData.json()

        setFetchedKeywords(data.results)
    }

    const fetchKeywordsById = async (id) => {

        if (id) {       // if passed keyword id exist try to fetch full keyword data from tmdb api
            try {
                const fetchData = await fetch(`https://api.themoviedb.org/3/keyword/${id}?api_key=30224a8dd75f4b2496bd014e38e56116`)

                if (fetchData.status === 200) {             // if fetch failed don't add keyword to the list
                    const data = await fetchData.json()
                    if (!data.status_code) {
                        dispatch(addKeyword(data))
                    }
                }
            } catch (e) {
            }
        }

    }

    useEffect(() => { // give suggestions after something typed
        if (keywordValue.length > 1) {
            fetchKeywords(keywordValue)
        } else {
            setFetchedKeywords([])
        }

    }, [keywordValue])


    useEffect(() => {

        if (props.keywordsFromUrl) {
            props.keywordsFromUrl.map(x => (fetchKeywordsById(x)))
        }

        //setKeywordList(keywordList2)
    }, [props.keywordsFromUrl])


    const handleKeywordSearch = (e) => {

        setKeywordValue(e.target.value)

    }

    //console.log(keywordList)

    const addKeywordToList = (i, e) => {
        if (keywordsList ? keywordsList.find(current => current.id === e.id) : false) {
        } else {
            dispatch(addKeyword(e)) // checks if no duplicates and pushes new keyword to the list
            //setKeywordList([...keywordList, { name: e.name, id: e.id }])  
        }
        setKeywordValue('')    // resets typed search to empty
    }

    const handleRemoveKeyword = (i) => {
        //setKeywordList(keywordList.filter(e => e.id !== i.id))
        dispatch(removeKeyword(i))
    }



    return (
        <>
            <div className='multi-selection'>
                <input
                    className='input--search-keywords'
                    // onBlur={x => { return handleOnFocus() }}
                    // onFocus={x => { return handleOnFocus() }}
                    value={keywordValue}
                    onChange={e => { return handleKeywordSearch(e) }}
                    type="text"
                    placeholder="Filter By Keywords..."
                />


                <ul 
                    // onMouseEnter={x => { return handleOnFocus2() }}
                    className='searchBox'>
                    {fetchedKeywords.length > 0
                        ? fetchedKeywords.map(e => { return <li onClick={i => { return addKeywordToList(i, e) }} key={e.id} className='searchItems' >{e.name} </li> })
                        : <p className='searchItems'>No Results</p>}
                </ul>


            </div>
            <div className='multi-selection'>

                {keywordsList ? keywordsList.map(i => { return <button onClick={e => { return handleRemoveKeyword(i) }} name='keywords' value={i.id} key={i.id} className="multi-selection_text style1">{i.name} <FontAwesomeIcon value={i} icon="times" className='icon' size="1x" onClick={e => { return removeKeyword(i) }} /></button> }) : ''}


            </div>

        </>
    )
}

export default Keywords;