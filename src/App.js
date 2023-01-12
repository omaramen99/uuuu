
import './App.css';


import _Gall_Viewer_page from './_Gall_Viewer_page/_Gall_Viewer_page'
import _Gall_Issues_page from './_Gall_Issues_page/_Gall_Issues_page'
import Gall_Header_comp from './Gall_Header_comp/Gall_Header_comp'





////////////////////
import Home_comp from './Home_comp/Home_comp';

import Error404_comp from './Error404_comp/Error404_comp';

import {BrowserRouter as Router , Route, Switch, Link, withRouter} from 'react-router-dom';
import history from './history';
import { Suspense } from 'react';
import React from 'react';


// import Books_comp from './Books_comp/Books_comp';
//lazy


function App() {
  console.log(history);
  return (
  
    <>
    <Gall_Header_comp />




    <Router history={history}>
    <Suspense fallback="loading...">

      {/* <Link to="/">Home</Link> */}
      {/* <Header_comp  /> */}
     {/* <Route path='/'  component={Header_comp} /> */}

     
     
    <Switch>
    
    
    <Route path='/project' exact component={_Gall_Viewer_page} />
    <Route path='/issues' exact component={_Gall_Issues_page} />
    <Route path='/' exact component={_Gall_Viewer_page} />
    
    {/* <Route path='/profile' exact component={Profile_Page_comp} />
    <Route path='/user' exact component={User_Profile_Page_comp} />
    <Route path='/project' exact component={Project_PageTS_comp} />
    <Route path='/team' exact component={Team_PageTS_comp} />
    <Route path='/projects' exact component={Projects_ALL_comp} />
    <Route path='/departments' exact component={Departments_ALL_comp} />
    <Route path='/users' exact component={Users_ALL_comp} /> */}
    
    <Route path='' component={Error404_comp}  />
    </Switch>





    {/* <Route path='/'  component={Footer_comp} /> */}

      </Suspense>
    </Router>





    {/* <Footer_comp /> */}
    </>
  );
}

export default App;
