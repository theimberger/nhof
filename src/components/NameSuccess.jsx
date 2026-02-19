import React from 'react';

export const NameSuccess = (props) => {

  return (
    <div className="success report"
      onClick={props.close()}>
      <img className="close" src="/closeX.svg" alt="close" />
      <p>You have inducted</p>
      <h1>{props.name}</h1>
      <p>To the Name Hall of Fame</p>
    </div>
  );

};

export default NameSuccess;
