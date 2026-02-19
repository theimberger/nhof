import React from 'react';
import * as listUtils from '@/utils/list_utils';

const NameItem = (props) => {
  const {
    member: {
      date,
      name,
      bio,
      id,
      score,
    },
    setVote,
    vote,
    rankingMap,
  } = props;

  const inducted = listUtils.formatDate(date);
  let shrink = '';

  name.split(' ').forEach((n) => {
    if (n.length > 10) {
      shrink = 'small_text';
    }
  });

  const sendVote = (value) => (e) => {
    e.preventDefault();
    setVote(id, score, value);
  };

  let place = Object.keys(rankingMap)
    .sort((a, b) => Number(b) - Number(a))
    .findIndex((keyScore) => keyScore === String(score));

  const numberAtPlace = rankingMap[score].length;
  place += 1;
  place = String(place);
  while (place.length < 4) {
    place = '0' + place;
  }

  return (
    <li>
      <h2 className='voted_header'>
        Voted - { place }
        { numberAtPlace > 1 && ` (t+${numberAtPlace - 1})` }</h2>
      <h2 className='date_header'>I: { inducted }</h2>
      <a href={ `https://en.wikipedia.org/wiki/${name}` }
        target='_blank'
      >
        <h1 className={ shrink }>{ name }</h1>
        <p>{ bio }</p>
      </a>
      <div className='voting_controls'>
        { !vote ?
          <React.Fragment>
            <button
              className='voting_controls_up'
              onClick={ sendVote(1) }
            >
              <img src="/vote-arrow.svg" className='voting_control_arrow_up' alt="" />
              Vote name up
            </button>
            <button
              className='voting_controls_down'
              onClick={ sendVote(-1) }
              disabled={ vote }
            >
              <img src="/vote-arrow.svg" className='voting_control_arrow_down' alt="" />
              Vote name down
            </button>
          </React.Fragment> :
          <React.Fragment>
            { vote === 1 &&
              <div className='voting_confirm_up'>
                You voted up
              </div>
            }
            <div />
            { vote === -1 &&
              <div className='voting_confirm_down'>
                You voted down
              </div>
            }
          </React.Fragment>
        }

      </div>
    </li>
  );
};

export default NameItem;
