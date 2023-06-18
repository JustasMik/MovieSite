import React from 'react'
import { Link } from 'react-router-dom'
import NovieSearch from './Movie_Search'


const HomePage = () => {
    return (
        <div className='page-center'>
            <div className='column'>
                <div className='column_header'>
                    <div className='column-wrap'>
                        <span className='column_border_start'> </span>
                        <h3>Summer 2020 movies</h3>
                        <span className='column_border_end'> </span>
                    </div>
                </div>
                    <NovieSearch/>
            </div>

        </div>
    )
}

export default HomePage;