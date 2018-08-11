import React from 'react'
import { connect } from 'react-redux'

import { clickLogin, changeDataUser } from 'Modules/Login/'

import { FormGroup, Col,  Button } from 'react-bootstrap'
import { LocalForm, Control } from 'react-redux-form'

const Login = ({clickLogin, changeDataUser, dataUser}) => {
  return  (<div className="container-fluid container-fluid-login">
            <div className="container-login">
              <LocalForm id="formLogin" onChange={(values) => changeDataUser(values)} onSubmit={(values) => clickLogin(values, changeDataUser, dataUser)}>
                <img src="../../images/user.svg" alt="user" width="150" />
                <br /><br /><br />
                <FormGroup controlId="formUser">
                  <Col>
                    <Control.text model=".username" className="form-control" placeholder="Usuario" type="text" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formPassword">
                  <Col>
                    <Control.text model=".password" className="form-control" placeholder="Password" type="password" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <Button type="submit" bsStyle="primary" className="button-invex" block >Entrar</Button>
                  </Col>
                </FormGroup>
              </LocalForm>
            </div>
         </div>);
};

const mapStateToProps = state => {
    return{
        dataUser: state.Login.get('dataUser').toJS()
    };
};

const mapDispatchToprops = dispatch => {
    return{
        clickLogin(state){
            dispatch(clickLogin(state));
        },
        changeDataUser(state){
            dispatch(changeDataUser(state));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(Login);
