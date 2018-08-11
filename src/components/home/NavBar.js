import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Nav, Navbar, MenuItem, NavDropdown } from 'react-bootstrap';

import { changeStatus } from 'Modules/Status';
import { clickLoginOut } from 'Modules/Login';
import { downloadFile } from 'Modules/File';
import { loadItems } from 'Modules/Items';

const NavBar = ({statusFile, date, items, changeStatus, statusId, clickLoginOut, downloadFile, statusActive, loadItems}) => {
  const onClickDownloadFile = (file) => {
    downloadFile(file, date);
    setTimeout(() =>{loadItems(statusActive.statusActive, date)}, 5000);
                    };
  return  (<Navbar inverse collapseOnSelect fluid>
            <Navbar.Header>
              <Navbar.Brand>
              <Link to="/home" className="logo"><img src="../../images/logo.png" alt="logo" width="45%" /></Link>
              </Navbar.Brand>
            </Navbar.Header>
              <Nav pullRight>
                <NavDropdown eventKey={2} title={<span><i className="fa fa-bars fa-lg" /></span>} noCaret id={3}>
                  <MenuItem header>Menu</MenuItem>
                  <MenuItem eventKey={2.1} disabled><i className="fa fa-upload" />&nbsp; Importar</MenuItem>
                  <NavDropdown eventKey={3} className='dropdown-sub' title={<span><i className="fa fa-download" />&nbsp; Exportar</span>} noCaret id={3}>
                    <MenuItem header>Exportar</MenuItem>
                    <MenuItem eventKey={3.1} onClick={()=>{onClickDownloadFile('POST')}}><i className="fa fa-file-text" />&nbsp; POSTEO</MenuItem>
                    <MenuItem eventKey={3.2} onClick={()=>{onClickDownloadFile('CERTIFICATION')}}><i className="fa fa-file-text" />&nbsp; SPEI</MenuItem>
                  </NavDropdown>
                  <MenuItem eventKey={2.2} disabled><i className="fa fa-check" />&nbsp; Certificar</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={2.3} onClick={()=>clickLoginOut()}><i className="fa fa-sign-out" />&nbsp; Cerrar sesión</MenuItem>
                </NavDropdown>
              </Nav>
          </Navbar>);
};

const mapStateToProps = state => {
    return{
        statusActive: state.Status.get('statusActive').toJS(),
        items: state.Items.get('items').toJS(),
        date: state.Date.get('date').toJS()
  };
};

const mapDispatchToprops = dispatch => {
    return{
        changeStatus(status){
            dispatch(changeStatus(status));
        },
        clickLoginOut(){
            dispatch(clickLoginOut());
        },
        downloadFile(typeFile, date){
            dispatch(downloadFile(typeFile, date));
        },
        loadItems(statusActive, date){
            dispatch(loadItems(statusActive, date));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(NavBar);
