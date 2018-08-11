import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeStatus } from 'Modules/Status';
import { loadItems } from 'Modules/Items';

import { Col } from 'react-bootstrap';

import  ButtonCard from './navbar-button/ButtonCard.js';

const NavbarButton = ({statusId, loadItems, changeStatus, countStatus, filterStatus, countDate, date, statusActive}) => {
  return  (<div className="container-fluid">
            <Row className="show-grid">
            <Col md={1} />
            <ButtonCard statusId='5'
                          date={date}
                          title='Aprobadas'
                          icon='fa fa-check fa-2x'
                          countStatus={countStatus[0]}
                          loadItems={loadItems}
                          statusActive={statusActive.statusActive}
                          changeStatus={changeStatus} />
              <ButtonCard statusId='4'
                          date={date}
                          title='Rechazadas'
                          icon='fa fa-times fa-2x'
                          countStatus={countStatus[1]}
                          loadItems={loadItems}
                          statusActive={statusActive.statusActive}
                          changeStatus={changeStatus} />
              <ButtonCard statusId='1'
                          date={date}
                          title='Solicitud'
                          icon='fa fa-file-text fa-2x'
                          countStatus={countStatus[2]}
                          loadItems={loadItems}
                          statusActive={statusActive.statusActive}
                          changeStatus={changeStatus} />
            <ButtonCard statusId='2'
                        date={date}
                        title='Env a Certificar'
                        icon='fa fa-clock-o fa-2x'
                        countStatus={countStatus[3]}
                        loadItems={loadItems}
                        statusActive={statusActive.statusActive}
                        changeStatus={changeStatus} />
              <ButtonCard statusId='6'
                          date={date}
                          title='Posteadas'
                          icon='fa fa-check fa-2x'
                          countStatus={countStatus[4]}
                          loadItems={loadItems}
                          statusActive={statusActive.statusActive}
                          changeStatus={changeStatus} />
              <Col md={1} />
           </Row>
         </div>);
};

const mapStateToProps = state => {
    return{
        date: state.Date.get('date').toJS(),
        countStatus: state.Items.get('countStatus').toJS(),
        statusActive: state.Status.get('statusActive').toJS()
    };
};

const mapDispatchToprops = dispatch => {
    return{
        changeStatus(status){
            dispatch(changeStatus(status));
        },
        loadItems(statusActive, date, restart){
            dispatch(loadItems(statusActive, date, restart));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(NavbarButton);
