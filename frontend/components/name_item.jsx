import React from 'react';
import * as listUtils from '../utils/list_utils';

const NameItem = (props) => {
  const {
    member: {
      date,
      name,
      bio,
    }
  } = props;

  const inducted = listUtils.formatDate(date);
  let shrink = '';

  name.split(' ').forEach((n) => {
    if (n.length > 10) {
      shrink = 'small_text';
    }
  });

  return (
    <a href={ `https://en.wikipedia.org/wiki/${name}` }
      target='_blank'
      key={ date }>
      <li>
        <h2>I: { inducted }</h2>
        <h1 className={ shrink }>{ name }</h1>
        <p>{ bio }</p>
        <div className='voting_controls'>
          <button className='voting_controls_up'>
            Vote name up
          </button>
          <button className='voting_controls_down'>
            Vote name down
          </button>

        </div>
      </li>
    </a>
  );
};

export default NameItem;