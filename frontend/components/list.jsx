import React from 'react';
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
    if (this.state.members.length === 0){
      return <div></div>;
    }
    let memberLis = [];
    this.state.members.forEach((member) => {
      let inducted = ListUtils.formatDate(member.date),
          shrink = "";

      member.name.split(" ").forEach((n) => {
        if (n.length > 10) {
          shrink = "small_text";
        }
      });

      memberLis.push(
        <a href={`https://en.wikipedia.org/wiki/${member.name}`}
          target="_blank"
          key={member.date}>
          <li>
            <h2>I: {inducted}</h2>
            <h1 className={shrink}>{member.name}</h1>
            <p>{member.bio}</p>
          </li>
        </a>
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
