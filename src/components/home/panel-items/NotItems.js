import React from 'react';
import { connect } from 'react-redux';

const NotItems = () => {
  return  (<div className="text-center">
            <br /><br />
            <img src="../../images/exclamation-triangle.svg" alt="exclamation" width="150" />
            <h4>¡No se encontraron registros!</h4>
            <br />
          </div>);
};

export default connect()(NotItems);
