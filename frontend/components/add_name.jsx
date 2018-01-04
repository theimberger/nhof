import React from 'react';
import NameError from './name_error';
import * as NameUtils from '../utils/name_utils';

class AddName extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: "TYPE NAME HERE",
      status: {
        ok: true,
        message: ""
      }
    };

    this.clearInitial = this.clearInitial.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInitial() {
    let newState = Object.assign({}, this.state);
    newState.inputValue = "";
    if (this.state.inputValue === "TYPE NAME HERE") {
      this.setState(newState);
    }
  }

  setInitial() {
    let newState = Object.assign({}, this.state);
    newState.inputValue = "TYPE NAME HERE";
    if (this.state.inputValue === "") {
      this.setState(newState);
    }
  }

  handleInput(e) {
    let newState = Object.assign({}, this.state);
    newState.inputValue = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    let newState = Object.assign({}, this.state);
    newState.status.message = "pending";

    NameUtils.submitName(this.state.inputValue).then(
      (res) =>{
        let name = NameUtils.validateName(res);
        if (!name) {
          newState.status.ok = false;
          newState.status.message = "not a name";
          this.setState(newState);
        }
        if (name === "no page found") {
          newState.status.ok = false;
          newState.status.message = "no name found";
          this.setState(newState);
        }
      });

    this.setState(newState);
  }

  render() {
    let statusReport;


    if (!this.state.status.ok) {
      $("#title_content").css("visibility", "hidden");
      statusReport = <NameError type={this.state.status.message} />;
    }

    return (
      <form id="add_name"
        onSubmit={(e) => this.handleSubmit(e)}>

        <input
          type="text"
          onFocus={() => this.clearInitial()}
          onBlur={() => this.setInitial()}
          onChange={(e) => this.handleInput(e)}
          value={this.state.inputValue}>

        </input>
        {statusReport}
      </form>
    );
  }

}

export default AddName;
