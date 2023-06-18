import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Pagination = ({ apiPages }) => {

    //let d = Math.ceil(apiPages / fetchTimes)
    const [paginationList, setPaginationList] = useState()
    //const [isTreeDotsVisible, setIsTreeDotsVisible] = useState(false)

    const { total, repetition } = apiPages // get total pages from api and how many times fetch was repeated

    const location = useLocation()
    const history = useHistory()
    
    let url = location.pathname.split('/')
    let params = new URLSearchParams(location.pathname.split('/')[2]);

    //console.log(params.toString())

    const handleClick = (e) => {

        if(!e.target.className.split(' ').includes('active')){  // if clicked on current page then ignore otherwise change page
        params.set('page', e.target.value)
        // params.delete('date_gte')
        // params.delete('date_lte')
        // params.set('search_type', 'seasonal-search')
        //history.push(`/movies/&${params.toString()}`)

        window.location.replace(`/${url[1]}/&${params.toString()}`)

        //return <Link draggable="false" to='/'> <FontAwesomeIcon icon="home" className='nav-list-icons' /><span>Home</span></Link>
        }
    }

    const getCurrentPage = () => {
        let pageNumberQuery = new URLSearchParams(location.pathname);
        return (pageNumberQuery.get('page')) ? pageNumberQuery.get('page') : 1
    }

    useEffect(() => {
        
        const createList = (totalPages, currentPage ) => {

            let listItems = []

            // let currentPage = getCurrentPage()
            // console.log(total)

            for (let x = 0; x < 3; x++) {               /// *1 means convert to number
                // if current page is 1 add on top and if totla pages is more then current with added repetition
                if (currentPage * 1 === 1 && totalPages >= x+1) {
                   // if(+((currentPage * 1) + (x * 1)) < +(Math.ceil(total * 1 / repetition * 1))){
                    listItems.push((currentPage * 1) + (x * 1))
                   // }
                }
                // if current page is more then 1 and less then total pages add on both - | + 
                else if (currentPage * 1 > 1 && currentPage * 1 < totalPages) {
                    listItems.push((currentPage * 1) + (x - 1))
                }
                // iff currert page is last then add 2 pages if they greater then 1
                else if (currentPage * 1 === totalPages && totalPages-x >= 1  ) {
                   
                    listItems.unshift((currentPage * 1) - (x * 1))
                    
                }
                //listItems.push( currentPage )
            }

            return listItems
        }

        setPaginationList(createList(Math.ceil(total * 1 / repetition * 1), getCurrentPage()))

    }, [])

    return (
        <div className="content-area">
            <div className="content-area__wrapper drag-off">
                <div className='pagination'>

                    <button
                        className='page-item'
                        value={getCurrentPage() * 1 - 1}
                        onClick={x => handleClick(x)}
                        disabled={getCurrentPage() * 1 === 1}
                    >
                        <FontAwesomeIcon
                            icon="chevron-right"
                            style={{ transform: `rotateZ(180deg)` }}
                            className='icon'
                        />
                    </button>

                    {(getCurrentPage() * 1 > 2)
                        ? <button className='page-item'>...</button>
                        : ''    // create three dots on left if it's not the first or second page
                    }


                    {paginationList ? paginationList.map(x => {
                        return <button
                            className={`page-item ${x === getCurrentPage() * 1 ? 'active' : ''}`}
                            key={x}
                            value={x}
                            onClick={x => handleClick(x)}>
                            {x} </button>
                    })

                        : ''}

                    {(getCurrentPage() * 1 < Math.ceil(total * 1 / repetition * 1) - 1)
                        ? <button className='page-item'>...</button>
                        : ''    // create three dots on right if it's not the last or second last page
                    }

                    <button
                        className='page-item'
                        value={getCurrentPage() * 1 + 1}
                        onClick={x => handleClick(x)}
                        disabled={getCurrentPage() * 1 === Math.ceil(total * 1 / repetition * 1)}
                    >
                        <FontAwesomeIcon
                            icon="chevron-right"
                            className='icon'
                        />
                    </button>


                </div>
            </div>
        </div>
    )
}

export default Pagination;