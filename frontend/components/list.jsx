import React from 'react';

import NameItem from './name_item';
import * as ListUtils from '../utils/list_utils';

class List extends React.Component {
  constructor() {
    super();
    this.state = { members: [] };
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  componentDidMount() {
    let newState = this.state;
    ListUtils.getNames().then(
      (res) => {
        newState.members = res;
        this.setState(newState);
      });
  }


  render() {
    const { members } = this.state;
    if (!members.length){
      return <div></div>;
    }

    return (
      <div id="list">
        <ul>
          { members.map(member => (
            <NameItem member={ member} />
          ))}
        </ul>
      </div>
    );
  }

}

export default List;
