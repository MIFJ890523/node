import React from 'react';
import { Row, Col,ButtonToolbar, Button, FormGroup, ControlLabel, Form, Badge } from 'react-bootstrap';
import DatePicker from 'jonshort-shim-react-bootstrap-date-picker';
import { connect } from 'react-redux';

import { loadItems } from 'Modules/Items'
import { changeDataStart, changeDataEnd } from 'Modules/Date'

const ButtonPanelData = ({loadItems, changeDataStart, changeDataEnd, statusActive, date, items}) => {

  const datePicker = [
    ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  ];

  return (<Col md={6}>
    <Row className="show-grid show-grid-panel ">
      <Col md={3} />
      <Col md={1} className="datePicker datePickerLabel"><ControlLabel>de:</ControlLabel></Col>
      <Col md={3} className="datePicker">
        <Form inline>
          <FormGroup className="buttonCardData">
            <DatePicker id="datepicker-start"
              dateFormat="DD/MM/YYYY"
              showClearButton={false}
              calendarPlacement="bottom"
              dayLabels={datePicker[0]}
              monthLabels={datePicker[1]}
              value={date.start}
              onChange={changeDataStart}
              maxDate={date.day} />
            </FormGroup>
          </Form>
        </Col>
        <Col md={1} className="datePicker datePickerLabel"><ControlLabel>a:</ControlLabel></Col>
        <Col md={3} className="datePicker">
          <FormGroup className="buttonCardData">
            <DatePicker id="datepicker-end"
              dateFormat="DD/MM/YYYY"
              showClearButton={false}
              calendarPlacement="bottom"
              dayLabels={datePicker[0]}
              monthLabels={datePicker[1]}
              value={date.end}
              onChange={changeDataEnd}
              maxDate={date.day} />
            </FormGroup>
          </Col>
          <Col md={1} className="col-button">
            <div>
              <ButtonToolbar>
                <Badge className="badge-navbarbutton">{items.length}</Badge>
                <Button bsStyle="success" className="buttonLittle button-invex" onClick={()=>{ loadItems(statusActive.statusActive, date, true) }}>
                  <i className="fa fa-search" />
                </Button>
              </ButtonToolbar>
            </div>
          </Col>
        </Row>
      </Col>);
    };

    const mapStateToProps = state => {
      return{
        date: state.Date.get('date').toJS(),
        statusActive: state.Status.get('statusActive').toJS(),
        items: state.Items.get('items').toJS()
      };
    };

    const mapDispatchToprops = dispatch => {
      return{
        changeDataStart(date){
          dispatch(changeDataStart(date));
        },
        changeDataEnd(date){
          dispatch(changeDataEnd(date));
        },
        loadItems(statusActive, date, restart){
          dispatch(loadItems(statusActive, date, restart));
        },
      };
    };

    export default connect(mapStateToProps,mapDispatchToprops)(ButtonPanelData);
