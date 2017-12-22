import React from 'react';
import Title from './title'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


class App extends React.Component {



  render() {

    return (
      <div>
        <Title />
      </div>
    );
  }

}

export default App;
