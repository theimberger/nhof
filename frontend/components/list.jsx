import React from 'react';

import NameItem from './name_item';
import { getNames, sendVoteToBackend } from '../utils/list_utils';
import { getVoteCookie, setVoteCookie } from '../utils/cookie_utils';

class List extends React.Component {
  constructor() {
    super();
    this.state = { members: [], votes: {}, rankingMap: {} };

    this.setVote = this.setVote.bind(this);
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  componentDidMount() {
    let newState = this.state;

    const existingCookie = getVoteCookie();

    if (!existingCookie) {
      setVoteCookie({});
    } else {
      newState.votes = existingCookie;
    }

    getNames().then(res => {
      const members = res;
      const rankingMap = {};
      newState.members = members;
      members.forEach(member => {
        if (rankingMap[member.score]) {
          rankingMap[member.score].push(member.id);
        } else {
          rankingMap[member.score] = [member.id];
        }
      });
      newState.rankingMap = rankingMap;
      this.setState(newState);
    });
  }

  setVote(id, score, vote) {
    const votes = Object.assign({}, this.state.votes);
    const rankingMap = Object.assign({}, this.state.rankingMap);
    const members = this.state.members;
    rankingMap[score] = rankingMap[score].filter(rankingId => rankingId !== id);

    const memberIdx = members.findIndex(existing => existing.id === id);
    const updatingMember = members[memberIdx];
    updatingMember.score += vote;

    if (!rankingMap[updatingMember.score]) {
      rankingMap[updatingMember.score] = [];
    }

    rankingMap[updatingMember.score].push(id);

    votes[id] = vote;
    setVoteCookie(votes);
    sendVoteToBackend(id, vote);

    this.setState({ votes, members, rankingMap });
  }

  render() {
    const { members, votes, rankingMap } = this.state;

    if (!members.length){
      return <div></div>;
    }

    return (
      <div id="list">
        <ul>
          { members.map(member => (
            <NameItem
              member={ member }
              setVote={ this.setVote }
              key={ member.id }
              vote={ votes[member.id] }
              rankingMap={ rankingMap }
            />
          ))}
        </ul>
      </div>
    );
  }

}

export default List;
