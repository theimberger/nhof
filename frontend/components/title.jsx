import React from 'react';
import AddName from './add_name';

class Title extends React.Component {

  render() {

    return (
      <div id="title_wrapper">
        <div className="wrapper">
          <div className="wrapper title_page">
            <h4>The</h4>
            <h1>Name Hall of Fame</h1>
            <div id="title_content">
              <h5>
                <span>Celebrating</span>
                <hr className="center_line" />
              </h5>
              <h2>
                the very best monikers
              </h2>
              <h5>
                <span>of all time</span>
                <hr className="center_line" />
              </h5>
              <h3>Add a name to the list</h3>
              <AddName />
              <p>Scroll to list</p>
              <img id="down_arrow" src={window.downArrow} />
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default Title;
