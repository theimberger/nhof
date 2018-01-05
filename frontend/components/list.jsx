import React from 'react';
import * as ListUtils from '../utils/list_utils';

class List extends React.Component {
  constructor() {
    super();
    this.state = { members: [] };
  }

  componentDidMount() {
    let newState = this.state;
    ListUtils.getNames();

  }


  render() {
    if (this.state.members.length === 0){
      return <div></div>;
    }

    return (
      <div id="list"></div>
    );
  }

}

export default List;
