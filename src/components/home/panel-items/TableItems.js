import React from 'react';
import { connect } from 'react-redux';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  unselectable: ['Aprobadas']
};

/* dataAlign="center */
const TableItems = ({items}) => {
return  (<BootstrapTable data={items} selectRow={ selectRowProp } hover>
          <TableHeaderColumn dataField='name' dataSort>Cliente</TableHeaderColumn>
          <TableHeaderColumn dataField='rfc'>RFC</TableHeaderColumn>
          <TableHeaderColumn dataField='lastClabe'>Cuenta Clabe</TableHeaderColumn>
          <TableHeaderColumn dataField='lastCardNumber'>Cuenta Tsys</TableHeaderColumn>
          <TableHeaderColumn isKey dataField='statusDesc'>STATUS</TableHeaderColumn>
        </BootstrapTable>);
};

const mapStateToProps = state => {
return{
  items: state.Items.get('items').toJS(),
}
}

export default connect(mapStateToProps)(TableItems);
