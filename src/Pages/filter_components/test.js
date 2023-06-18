import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addYears } from '../../Redux/Actions/filter';

const Test = () => {

    //const [yearList, setYearList] = useState([])

    const dispatch = useDispatch()
    const yearList = useSelector(state => state.yearList, shallowEqual)

    const location = useLocation();
    const [seasonList, setSeasonList] = useState()
    const [dsa, setDsa] = useState([])
    const [bla, setBla] = useState([])
    const [dsaaa, setdsaaa] = useState('')


    const filterValues = [
        {
            current: 'page=',
            tmdbUrl: 'page=',
            defaultValue: 'page=1',
        },
        {
            current: 'sort_by=',
            tmdbUrl: 'sort_by=',
            defaultValue: 'sort_by=popularity.desc',
        },
        {
            current: 'rating_gte=',
            tmdbUrl: 'vote_average.gte=',
            defaultValue: 'vote_average.gte=0',
        },
        {
            current: 'rating_lte=',
            tmdbUrl: 'vote_average.lte=',
            defaultValue: 'vote_average.lte=10',
        },
        {
            current: 'genres=',
            tmdbUrl: 'with_genres=',
            defaultValue: '',
        },
        {
            current: 'keywords=',
            tmdbUrl: 'with_keywords=',
            defaultValue: '',
        },
        {
            current: 'date_gte=',
            tmdbUrl: 'primary_release_date.gte=',
            defaultValue: '',
        },
        {
            current: 'date_lte=',
            tmdbUrl: 'primary_release_date.lte=',
            defaultValue: '',
        },

    ]


    let params = new URLSearchParams(location.pathname);
    let page = params.get("page");
    let pageUrl = page ? (isNaN(page * 1) ? `page=${page * 1}` : 'page=1') : 'page=1'     // checks if page exist and is a number if not return default value of page=1

    const sortValues = [
        'popularity.desc',
        'popularity.asc',
        'vote_average.desc',
        'vote_average.asc',
        'vote_count.desc',
        'vote_count.asc',
        'release_date.desc',
        'release_date.asc',
    ]

    let sort = params.get("sort_by");
    let sortUrl = sort ? (sortValues.includes(sort) ? `sort_by=${sort}` : 'sort_by=vote_count.desc') : 'sort_by=vote_count.desc'

    let searchType = params.get("search_type");
    let searchTypeUrl = searchType ? `search_type=${searchType}` : 'search_type=none'

    let dateGte = params.get("date_gte");
    let dateGteUrl
    let dateLte = params.get("date_lte");
    let dateLteUrl
    
    const searchCheck = () => {
        if (searchType) {
            switch (searchType) {
                case 'release-date-search': {
                    searchTypeUrl = 'search_type=release-date-search'
                    dateGteUrl = dateGte ? (dateGte.split('-').length === 3 ? `primary_release_date.gte=${dateGte}` : '') : ''
                    dateLteUrl = dateLte ? (dateLte.split('-').length === 3 ? `primary_release_date.lte=${dateLte}` : '') : ''
                }
                case 'seasonal-search': return
                default: return
            }
        }
    }

    searchCheck()




    //do this in overview

    let ratingGte = params.get("rating_gte");
    let ratingLte = params.get("rating_lte");
    let genres = params.get("genres");
    let keywords = params.get("keywords");




    // console.log(sortUrl, pageUrl, searchTypeUrl, dateGteUrl, dateLteUrl)

    // console.log(page, sort, searchType, ratingGte, ratingLte, genres, keywords)


    return (
        <div className="content-area">
            <div className="content-area__wrapper drag-off">
                <div className="Select-master-div seasonSearch">
                    <div className="Season_LeftGroup">
                        <div className="season-list">
                            test
                <button>click me </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Test);