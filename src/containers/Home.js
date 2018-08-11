import React from 'react'
import { connect } from 'react-redux'

import { loadItems } from 'Modules/Items/'

import  NavBar from 'Components/home/NavBar.js'
import  NavbarButton from 'Components/home/NavbarButton.js'
import  PanelItems from 'Components/home/PanelItems.js'

class Home extends React.Component {
  componentDidMount() {
    this.props.loadItems(this.props.statusActive.statusActive, this.props.date, true);
    }
    render() {
      return (
        <div>
          <NavBar />
          <NavbarButton />
          <PanelItems />
        </div>
      )
    }
}

const mapStateToProps = state => {
    return{
        statusActive: state.Status.get('statusActive').toJS(),
        date: state.Date.get('date').toJS(),
    };
};

const mapDispatchToprops = dispatch => {
    return{
        loadItems(statusActive, date, restart){
            dispatch(loadItems(statusActive, date, restart));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(Home);
