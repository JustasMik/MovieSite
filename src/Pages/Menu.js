import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Menu = () => {
    return (
        <div className="scrollableNav">
            <div className="wrapper">
                <div className='user-nav'>
                    <Link draggable="false" to='/'></Link>
                    <FontAwesomeIcon className="logo" icon={['fab', 'digg']} size="5x" />

                    <h3 className="nav-title">Menu</h3>

                    <ul className='navbar-list'>
                        <Link draggable="false" to='/'> <li><FontAwesomeIcon icon="home" className='nav-list-icons' /><span>Home</span></li></Link>
                        <Link draggable="false" to='/tv'><li><FontAwesomeIcon icon="tv" className='nav-list-icons' size="sm" /><span> Tv Shows</span></li></Link>
                        <Link draggable="false" to='/movie'><li><FontAwesomeIcon icon="play" className='nav-list-icons' size="sm" /><span>Movies</span></li></Link>
                        <Link draggable="false" to='/tv'><li><FontAwesomeIcon icon="play" className='nav-list-icons' size="sm" /><span>On Tv</span></li></Link>
                        <Link draggable="false" to='/movie'><li><FontAwesomeIcon icon="play" className='nav-list-icons' size="sm" /><span>Upcoming Movies</span></li></Link>
                    </ul>

                    <h3 className="nav-title">User</h3>

                    <ul className='navbar-list'>
                        <Link draggable="false" to='/'> <li><FontAwesomeIcon icon="bell" className='nav-list-icons' /><span>Notifications</span></li></Link>
                        <Link draggable="false" to='/counter'><li><FontAwesomeIcon icon="list-alt" className='nav-list-icons' size="sm" /><span>My List</span></li></Link>
                        <Link draggable="false" to='/counter2'><li><FontAwesomeIcon icon="user" className='nav-list-icons' size="sm" /><span>Profile</span></li></Link>
                        <Link draggable="false" to='/todoapp'><li><FontAwesomeIcon icon="cog" className='nav-list-icons' size="sm" /><span>Settings</span></li></Link>
                        <Link draggable="false" to='/about'><li><FontAwesomeIcon icon="sign-out-alt" className='nav-list-icons' size="sm" /><span>Sign Out</span></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu;