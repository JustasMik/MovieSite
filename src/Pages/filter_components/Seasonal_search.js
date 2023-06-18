import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addYears } from '../../Redux/Actions/filter';

const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()

const SeasonalSearch = (props) => {


    const dispatch = useDispatch()
    const yearList = useSelector(state => state.yearList, shallowEqual)
    //const yearList = [1,5,51,3,546,1561,15465]
    const location = useLocation();
    const history = useHistory()
    const [seasonList, setSeasonList] = useState()
    const [currentActive, setCurrentActive] = useState()


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


    useEffect(() => { // creates array list of years from around 2020 to 1940

        if (yearList.length > 1) { // if year array doesn't exist create one
        } else {
            MakeYearList()
        }



        // let season = `${checkSeason(currentMonth)}-${currentYear}`   

        // // props.handleSubmit(e)
        // let url = location.pathname.split('/')
        // let params = new URLSearchParams(location.pathname.split('/')[2]);

        // params.set('season', season)
        // params.delete('date_gte')
        // params.delete('date_lte')
        // params.set('search_type', 'seasonal-search')

        // history.push(`${params.toString()}`)

    }, [])

    useEffect(() => {

        const createSeasonList = () => {
            let seasons = ['spring', 'summer', 'fall', 'winter']

            let params = new URLSearchParams(location.pathname.split('/')[2]);

            let seasonFromUrl = params.get('season') ? params.get('season').split('-') : ''


            //let propsData = (props ? props.season : false) ? props.season.split('-') : ''

            //let year = props ? propsData[1] : currentYear
            let year = (seasonFromUrl.length === 2 ? !(isNaN(seasonFromUrl[1])) : false) ? seasonFromUrl[1] : currentYear // get current year or season year from url

            let season = ''

            if (seasonFromUrl.length === 2 && seasons.includes(seasonFromUrl[0])) {

                season = seasonFromUrl[0]

                setCurrentActive(seasonFromUrl.join('-'))

            } else {
                season = checkSeason(currentMonth)
                setCurrentActive('')
            }


            let List = []
            let currentLoop = 0
            let initialSeason = seasons.indexOf(season)

            console.log(initialSeason)
            //// makes season list
            for (let x = initialSeason; x <= (7 + initialSeason * 1); x++) {

                if (currentLoop > 0) {
                    List.push(seasons[x - 4 * currentLoop] + ' ' + (year * 1 -1))
                } else {
                    List.push(seasons[x] + ' ' + (year * 1 -1))
                }

                if (List[List.length - 1].match('winter')) {
                    currentLoop = currentLoop + 1
                    year = year*1 + 1
                }
            }
            setSeasonList(List)
        }

        createSeasonList()


    }, [location.pathname])



    const MakeYearList = () => {        /// makes year array
        const currentYear = new Date().getFullYear()
        const input = []


        for (let i = 1920; i <= currentYear; i++) {     // 
            input.unshift(i) // add items to the beginning of an array
        }
        dispatch(addYears(input))
    }

    const handleClick = (e) => {
        // props.setCurrentSeason(e.target.value)

        // props.handleSubmit(e)
        let url = location.pathname.split('/')
        let params = new URLSearchParams(location.pathname.split('/')[2]);

        params.set('season', e.target.value)
        params.delete('date_gte')
        params.delete('date_lte')
        params.set('search_type', 'seasonal-search')

        console.log(params.toString())

        history.push(`${params.toString()}`)
    }
    
    const handleSumbit = (e) => { // on sumbit remove prev trace of date from url and set season
        // props.setCurrentSeason(e.target.value)
        e.preventDefault()

        let season = `${e.target.Season_Option.value}-${e.target.SeasonYear.value}`
        

        // props.handleSubmit(e)
        let url = location.pathname.split('/')
        let params = new URLSearchParams(location.pathname.split('/')[2]);

        params.set('season', season)
        params.delete('date_gte')
        params.delete('date_lte')
        params.set('search_type', 'seasonal-search')

        console.log(params.toString())

        history.push(`${params.toString()}`)
    }
    

    return (
        <>
        { (yearList ? yearList.length > 1 : false) ? <div className="content-area">
            <div className="content-area__wrapper drag-off">
                <div id="seasonSearchId" className="Select-master-div seasonSearch">
                    <div className="Season_LeftGroup">
                        <div className="season-list">

                            {seasonList
                                ? seasonList.map((x) => {
                                    return (
                                        <button
                                            onClick={(e) => {
                                                return handleClick(e);
                                            }}
                                            value={x.replace(" ", "-")}
                                            key={x}
                                            className={`seasonBtn ${(x.replace(" ", "-").match(currentActive) ? currentActive : false)
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            {x}
                                        </button>
                                    );
                                })
                                : ""}


                        </div>
                    </div>

                    <form onSubmit={e => {return handleSumbit(e)}}>
                        <div className="Season_rightGroup">
                            <div className="wrapper">
                                <FontAwesomeIcon icon="chevron-right" className="icon" />
                                <select
                                    onChange={(event) => console.log("clicked")}
                                    //value={currentYear}
                                    name="SeasonYear"
                                    className="select-c"
                                >
                                    {/* <option value="">Year</option> */}
                                    {yearList.map((e) => {
                                        return (
                                            <option key={e} value={e*1}>
                                                {e}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="wrapper">
                                <FontAwesomeIcon icon="chevron-right" className="icon" />
                                <select
                                    onChange={(event) => console.log("clicked")}
                                    //value={currentYear}
                                    name="Season_Option"
                                    className="select-c"
                                >
                                    <option value="winter">Winter</option>
                                    <option value="spring">Spring</option>
                                    <option value="summer">Summer</option>
                                    <option value="fall">Fall</option>
                                </select>
                            </div>

                            <input
                                type="submit"
                                className="button--big-red smaller"
                                value="Go"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        : ''}
        </>
    );
}

export default React.memo(SeasonalSearch);