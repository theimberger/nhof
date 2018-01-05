import React from 'react';
import Title from './title';
import Spacer from './spacer';
import List from './list';

class App extends React.Component {

  render() {

    return (
      <div id="app">
        <Title />
        <Spacer />
        <List />
      </div>
    );
  }

}

export default App;
