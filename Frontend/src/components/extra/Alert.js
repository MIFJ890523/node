import React from 'react';
import { connect } from 'react-redux';
import { hideAlert } from '../../actionsCreators';


const Alert = ({alert, hideAlert}) => {
  setTimeout(() => hideAlert(), 5000)
  return  (<div className={alert.position} id="toast-container" aria-live="polite" role="alert">
            <div className={alert.typeMsj}><button className="toast-close-button" onClick={()=>{hideAlert()}}>×</button>
              <div className="toast-message">{alert.message}</div>
            </div>

          </div>);
};

const mapStateToProps = state => {
    return{
        alert: state.alert,
    };
};

const mapDispatchToprops = dispatch => {
    return{
        hideAlert(){
            dispatch(hideAlert());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(Alert);
