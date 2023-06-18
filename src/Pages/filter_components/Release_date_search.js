import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux';
import { addYears } from '../../Redux/Actions/filter';

const monthList = [
    { name: `January`, value: 1 },
    { name: `February`, value: 2 },
    { name: `March`, value: 3 },
    { name: `April`, value: 4 },
    { name: `May`, value: 5 },
    { name: `June`, value: 6 },
    { name: `July`, value: 7 },
    { name: `August`, value: 8 },
    { name: `September`, value: 9 },
    { name: `October`, value: 10 },
    { name: `November`, value: 11 },
    { name: `December`, value: 12 },
]

const ReleaseDate = (props) => {

    console.log('release date')


    //const [yearList, setYearList] = useState([])

    const dispatch = useDispatch()
    const yearList = useSelector(state => state.yearList)

    const [currentFromMonth, setCurrentFromMonth] = useState(1)
    const [currentFromYear, setCurrentFromYear] = useState(new Date().getFullYear())
    const [currentFromDay, setCurrentFromDay] = useState(1)
    const [dayListFrom, setDayListFrom] = useState([])


    const [currentToMonth, setCurrentToMonth] = useState(1)
    const [currentToYear, setCurrentToYear] = useState(new Date().getFullYear())
    const [currentToDay, setCurrentToDay] = useState(1)
    const [dayListTo, setDayListTo] = useState([])

    const location = useLocation()

    const [warningOutline, setWarningOutline] = useState(false)


    useEffect(() => { // creates array list of years from around 2020 to 1940


        if (yearList.length > 1) { // if year array doesn't exist create one
        } else {
            MakeYearList()
        }

        // if (currentFromMonth && currentFromYear && currentFromDay) {
        // } else {
        //     // const initialDates = () => {
        //     const dateGte = props.date_gte.split('-').map(Number)
        //     setCurrentFromYear(dateGte[0])
        //     setCurrentFromMonth(dateGte[1])
        //     setCurrentFromDay(dateGte[2])
        // }

        // if (currentToMonth && currentToYear && currentToDay) {
        // } else {
        //     // const initialDates = () => {
        //     const dateLte = props.date_lte.split('-').map(Number)
        //     setCurrentToYear(dateLte[0])
        //     setCurrentToMonth(dateLte[1])
        //     setCurrentToDay(dateLte[2]) 
        // }


        if (currentFromMonth && currentFromYear && currentFromDay) {
            const dateGte = props.date_gte ? props.date_gte.split('-').map(Number) : ''
            if(dateGte ? dateGte.length === 3 : false){
            setCurrentFromYear(dateGte[0])
            setCurrentFromMonth(dateGte[1])
            setCurrentFromDay(dateGte[2])
            }
        } else {
        }

        if (currentToMonth && currentToYear && currentToDay) {
            const dateLte = props.date_lte ? props.date_lte.split('-').map(Number) : ''
            if(dateLte ? dateLte.length === 3 : false){
            setCurrentToYear(dateLte[0])
            setCurrentToMonth(dateLte[1])
            setCurrentToDay(dateLte[2])
            }
        } else {
        }

        return (() => {
            setCurrentFromMonth('')
            setCurrentFromYear('')
            setCurrentFromDay('')
            setDayListFrom('')
            setCurrentToMonth('')
            setCurrentToYear('')
            setCurrentToDay('')
            setDayListTo('')
            setWarningOutline('')
        })
    }, [])

    const MakeYearList = () => {
        const currentYear = new Date().getFullYear()
        const input = []


        for (let i = 1920; i <= currentYear; i++) {     // 
            input.unshift(i) // add items to the beginning of an array
        }
        dispatch(addYears(input))
    }


    useEffect(() => { // creates From section days list
        CreateFromDaysList()
    }, [currentFromMonth])

    useEffect(() => { // creates To section days list
        CreateToDaysList()
    }, [currentToMonth])




    //////////////////
    //     console.time('loop')
    // console.timeEnd('loop')

    const CreateFromDaysList = () => { // get correct amount of days in the month based of the year
        const d = (y, m) => new Date(y, m, 0).getDate();

        const makeDaysList = [...new Array(d(currentFromYear, currentFromMonth))]

        if (currentFromDay > makeDaysList.length) {
            setCurrentFromDay(makeDaysList.length)
        }

        setDayListFrom(makeDaysList)
    }
    /////////

    const CreateToDaysList = () => { // get correct amount of days in the month based of the year

        const d = (y, m) => new Date(y, m, 0).getDate();
        const makeDaysList = [...new Array(d(currentToYear, currentToMonth))]

        if (currentToDay > makeDaysList.length) {
            setCurrentToDay(makeDaysList.length)
        }

        setDayListTo(makeDaysList)
    }

    //////////////////////


    const handleSubmit = (e) => {
        e.preventDefault()

        const dateFrom = new Date(`${currentFromMonth} ${currentFromDay} ${currentFromYear}`); // mm/dd/yyyy 
        const dateTo = new Date(`${currentToMonth} ${currentToDay} ${currentToYear}`);

        if (dateFrom <= dateTo) {   // compares dates
            setWarningOutline(false)
            props.handleSubmit(e)

        } else {
            setWarningOutline(true)
        }

    }

    let displaySelectClass = `select-c ${warningOutline ? `outline-warning` : ''}`  // change class name for all select boxes if warning is trown

    return (
        <>{dayListTo.length > 1 ?
            <div className='content-area'>
                <div className='content-area__wrapper drag-off'>
                    <form className='releaseDateSearchForm' onSubmit={e => { return handleSubmit(e) }}>
                        <div id='releaseDateSearchId' className='releaseDateSearch'>

                            <p className='text'>From</p>

                            <div className='releaseDateSearch-group'>

                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            onChange={event => setCurrentFromDay(+(event.target.value))}
                                            value={currentFromDay}
                                            name='fromDay'
                                            className={displaySelectClass} >

                                            {dayListFrom.map((e, i) => {
                                                return <option
                                                    key={`${(i + 1)}${currentFromMonth}${currentFromYear}`}
                                                    value={+(i + 1)} >{(i + 1)}</option>
                                            })}

                                        </select>
                                    </div>
                                </div>


                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            onChange={event => setCurrentFromMonth(+(event.target.value))}
                                            value={currentFromMonth}
                                            name='fromMonth'
                                            className={displaySelectClass}>

                                            {monthList.map(e => { return <option key={e.name} value={e.value} >{e.name}</option> })}

                                        </select>
                                    </div>
                                </div>

                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            onChange={event => setCurrentFromYear(+(event.target.value))}
                                            value={currentFromYear}
                                            name='fromYear'
                                            className={displaySelectClass}>

                                            {/* <option value="">Year</option> */}
                                            {yearList.map(e => { return <option key={e} value={e} >{e}</option> })}
                                        </select>
                                    </div>
                                </div>

                            </div>



                            <p className='text'>To</p>

                            <div className='releaseDateSearch-group'>

                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            value={currentToDay}
                                            onChange={event => setCurrentToDay(+(event.target.value))}
                                            className={displaySelectClass}
                                            name='toDay'>
                                            {dayListTo.map((e, i) => {
                                                return <option
                                                    key={`${(i + 1)}${currentToMonth}${currentToYear}`}
                                                    value={+(i + 1)} >{(i + 1)}</option>
                                            })}

                                        </select>
                                    </div>
                                </div>

                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            value={currentToMonth}
                                            onChange={event => setCurrentToMonth(+(event.target.value))}
                                            name='toMonth'
                                            className={displaySelectClass} >


                                            {monthList.map(e => { return <option key={e.name} value={e.value} >{e.name}</option> })}
                                        </select>
                                    </div>
                                </div>

                                <div className='Select-master-div releaseDate'>
                                    <div className='wrapper'>
                                        <FontAwesomeIcon icon="chevron-right" className='icon' />
                                        <select
                                            value={currentToYear}
                                            onChange={event => setCurrentToYear(+(event.target.value))}
                                            className={displaySelectClass}
                                            name='toYear'>

                                            {/* <option value="">Year</option> */}
                                            {yearList.map(e => { return <option key={e} value={e} >{e}</option> })}

                                        </select>
                                    </div>
                                </div>

                            </div>

                            <input type='submit' className='button--big-red smaller' value='Go' />
                            {warningOutline ? <p className='text--normal darkB uppercase'>Make sure dates don't overlap</p> : ''}

                        </div>
                    </form>
                </div>
            </div>
            : ''}
        </>

    )
}

export default ReleaseDate;