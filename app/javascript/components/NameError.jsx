import React from 'react';

export const NameError = (props) => {
  let title,
      details;

  switch (props.type) {
    case "no name found":
      title = "Whoops";
      details = <p>It's got to be someone the world knows. <br/>
        They should be on wikipedia or something, you know?</p>;
      break;
    case "not a name":
      title = "Whoops";
      details = <p>That doesn't seem to be a name. <br/>
        Check your spelling maybe?</p>;
      break;
    case "already submitted":
      title = "Great Minds...";
      details = <p>It looks like somebody has already submitted that name</p>;
      break;
    case "blacklisted":
      title = "Blacklisted";
      details = <p>Sorry, we're not gonna put that name up.</p>;
      break;
    default:
      title = "Error";
      details = <p>Uh oh, some unforseen evil has
      befallen your submission.<br/>Try again.</p>;
  }

  return (
    <div className="error report" onClick={props.close()}>
      <img className="close"
        src={window.closeX} />
      <h1>{title}</h1>
      {details}
    </div>
  );
};

export default NameError;
