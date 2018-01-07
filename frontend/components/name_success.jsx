import React from 'react';

export const NameSuccess = (props) => {

  return (
    <div className="success report">
      <img className="close"
        onClick={props.close()}
        src={window.closeX} />
      <p>You have inducted</p>
      <h1>{props.name}</h1>
      <p>To the Name Hall of Fame</p>
    </div>
  );

};

export default NameSuccess;
