import React from 'react';
import Title from './title';
import List from './list';

class App extends React.Component {
  constructor() {
    super();
    this.state = {count: 1};
    this.updateList = this.updateList.bind(this);
  }

  updateList () {
    let newState = this.state;
    newState.count += 1;
    this.setState(newState);
  }

  render() {
    return (
      <div id="app">
        <Title updateList={this.updateList} />
        <List count={this.state.count} />
      </div>
    );
  }

}

export default App;
