import React from 'react';
import * as ListUtils from '../utils/list_utils';

class List extends React.Component {
  constructor() {
    super();
    this.state = { members: [] };
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
    if (this.state.members.length === 0){
      return <div></div>;
    }
    let memberLis = [];
    this.state.members.forEach((member) => {
      let idInt = parseInt(member.id);
      idInt = (idInt / 10000).toString();
      idInt = idInt.slice(2);




      memberLis.push(
        <li key={idInt}>
          <h2>{idInt}</h2>
          <h1>{member.name}</h1>
          <p>{member.bio}</p>
        </li>
      );
    });

    return (
      <div id="list">
        <ul>
          {memberLis}
        </ul>
      </div>
    );
  }

}

export default List;
