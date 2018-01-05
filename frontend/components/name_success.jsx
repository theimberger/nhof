import React from 'react';

class NameSuccess extends React.Component {

  render() {
    return (
      <div className="success report">
        <img className="close"
          onClick={this.props.close()}
          src={window.closeX} />
        <p>You have inducted</p>
        <h1>{this.props.name}</h1>
        <p>To the Name Hall of Fame</p>
      </div>
    );
  }
}

export default NameSuccess;
