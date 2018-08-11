import React from 'react';
import { Panel, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import  ButtonPanelData from './panel-items/ButtonPanelData.js';
import  TableItems from './panel-items/TableItems.js';
import  NotItems from './panel-items/NotItems.js';

const PanelItems = ({items}) => {
  return  (<div className="container-fluid padding-top">
    <Panel>
      <Panel.Heading>
        <Panel.Title>
          <Row>
            <Col md={6} />
            <ButtonPanelData />
          </Row>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        {(items.length === 0) ? <NotItems /> : <TableItems />}
      </Panel.Body>
    </Panel>
  </div>);
};

const mapStateToProps = state => {
  return{
    items: state.Items.get('items').toJS()
  };
};

export default connect(mapStateToProps)(PanelItems);
