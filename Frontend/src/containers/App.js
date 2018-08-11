import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";

import  Home from './Home.js'
import  Login from './Login.js'


const App = ({dataUser}) => (
  <div>
    {(dataUser.loggedIn === true)?<Home />:<Login />}
  </div>
);

const mapStateToProps = state => {
    return{
        dataUser: state.Login.get('dataUser').toJS()
    };
};

export default connect(mapStateToProps)(App)
