import React from 'react';
import { Row, Col,ButtonToolbar, Button, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';

const ButtonCard = (props) => {
    return  (<Col md={2}>
              <Row className={(props.statusActive === props.statusId)?"show-grid card-select":"show-grid card"}>
               <Col md={4} className="col-button">
                 <div>
                   <ButtonToolbar>
                     <Button bsStyle="success" className="buttonCard button-invex" onClick={()=>{props.changeStatus(props.statusId);
                                                                                                  props.loadItems(props.statusId,  props.date, false)
                                                                                                }}>
                      <i className={props.icon} />
                    </Button>
                   </ButtonToolbar>
                 </div>
               </Col>
               <Col md={8} className="col-text">
                 <div>
                    <ControlLabel>{props.title}</ControlLabel>
                   <br />
                   <span className="span-text">{(props.countStatus.length === 0)?true:(props.countStatus.length)}</span>
                 </div>
               </Col>
              </Row>
            </Col>);
};

export default connect()(ButtonCard);
