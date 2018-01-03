import React from 'react';

class AddName extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: "TYPE NAME HERE"
    };

    this.clearInitial = this.clearInitial.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  clearInitial() {
    if (this.state.inputValue === "TYPE NAME HERE") {
      this.setState({inputValue: ""});
    }
  }

  setInitial() {
    if (this.state.inputValue === "") {
      this.setState({inputValue: "TYPE NAME HERE"});
    }
  }

  handleInput(e) {
    this.setState({inputValue: e.target.value});
  }

  render() {
    console.log(this.state);
    return (
      <form id="add_name">
        <input
          type="text"
          onFocus={() => this.clearInitial()}
          onBlur={() => this.setInitial()}
          onChange={(e) => this.handleInput(e)}
          value={this.state.inputValue}>

          </input>
      </form>
    );
  }

}

export default AddName;
