import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { lowerScoreChanged, higherScoreChanged } from '../../Redux/Actions/filter';

const Score = () => {

    // const [score, setScore] = useState({ lower: 0, higher: 10 }); // sets slider knobs value
    const [scoreBackgroundStyle, setScoreBackgroundStyle] = useState({
        marginLeft: '0%',
        marginRight: '0%',
    })

    const dispatch = useDispatch()

    const ratings = useSelector(state => state.filterScoreChange)

    const handleScoreChange = (e) => {                      // sets knob value and css style on slider change
        if (e.id === "lowerSlider") {
            if (+(e.value) < +(ratings.higher)) {         // converts slider values to numbers and doesn't allow slider knobs overlap
                dispatch(lowerScoreChanged( +(e.value) ))
            }
        } else {
            if (+(e.value) > +(ratings.lower)) {
                dispatch(higherScoreChanged( +(e.value) ))
            }
        }
    }

    useEffect(() => {
        setScoreBackgroundStyle({ marginRight: `${(10 - +(ratings.higher)) * 10}%` , marginLeft: `${+(ratings.lower) * 10}%` })
    }, [ratings])

 
    return (
        <>
            <p className="multi-selection_text darkStyle">{`Rated ${ratings.lower} - ${ratings.higher}`}</p>
            <div className='filter_panel_multi_slider_wrapper'>
                <input name='vote_average_gte' type="range" min={0} max={10} value={ratings.lower} className="filter_panel_multi_slider" id="lowerSlider" onChange={e => { return handleScoreChange(e.target) }} />
                <input name='vote_average_lte' type="range" min={0} max={10} value={ratings.higher} className="filter_panel_multi_slider" id="higherSlider" onChange={e => { return handleScoreChange(e.target) }} />
                <div style={scoreBackgroundStyle} className='filter_panel_background_active'></div>
            </div>
        </>
    )
}




export default Score;