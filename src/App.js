import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faHome, faTv, faBell, faListAlt, faCog, faSignInAlt, faSignOutAlt, faFlagCheckered, faBook, faTrashAlt, faList, faStar, faPlay, faPlayCircle, faComment, faArrowAltCircleUp, faArrowAltCircleDown, faShareAlt, faFile, faUser, faSearch, faSlidersH, faChevronRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle as faPlayCircleRegular } from '@fortawesome/free-regular-svg-icons'

import HomePage from './Pages/Home_page'
import Menu from './Pages/Menu'
import MovieOverview from './Pages/Movie_Overview'
import MovieSearch from './Pages/Movie_Search'
import Navbar from './Pages/Navbar'
import Background from './Pages/Background'
import FourZeroFour from './Pages/FourZeroFour'
import SearchPage from './Pages/SearchPage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


library.add(fab, faPlayCircleRegular ,faCheckSquare, faCoffee, faHome, faTv, faBell, faListAlt, faCog, faSignInAlt, faSignOutAlt, faFlagCheckered, faBook, faTrashAlt, faList, faStar, faPlayCircle, faComment, faArrowAltCircleUp, faArrowAltCircleDown, faShareAlt, faFile, faPlay, faUser, faSearch, faSlidersH, faChevronRight, faTimes)

function App() {

  return (

//<Route path="/hotels" component={props => <HotelsPage {...props} />} refresh
//<Route path='/shows' exact component={props => <HomePage {...props} />} />
//<Route path='/movies' exact component={props => <HomePage {...props} />} />


    <Router>
      <Background/>
      <Menu />
      <Navbar />
      <Switch>
        
        <Route path='/tv' exact component={props => <HomePage {...props} />} />
        <Route path='/movie' exact component={props => <HomePage {...props} />} />
      
        <Route path='/tv/:filter' exact component={props => <HomePage {...props} />} />
        <Route path='/movie/:filter' exact component={props => <HomePage {...props} />} />

        <Route path='/search/:search' exact component={props => <SearchPage {...props} />} />

{/* 
        <Route path='/shows/:page/:filter' exact component={MovieOverview}></Route>
        <Route path='/movies/:page/:filter' exact component={MovieOverview}></Route> */}
        <Route path='/' exact component={HomePage}></Route>

        <Route component={FourZeroFour} />
        
      </Switch>
    </Router>
  );
}

export default App;
