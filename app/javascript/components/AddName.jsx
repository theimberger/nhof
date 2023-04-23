import React from 'react';
import NameError from './NameError';
import NameSuccess from './NameSuccess';
import * as NameUtils from '../utils/name_utils';
import * as DataUtils from '../utils/data_utils';

class AddName extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: "TYPE NAME HERE",
      status: {
        pending: true,
        message: ""
      }
    };

    this.clearInitial = this.clearInitial.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAsync = this.handleAsync.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  closeError() {
    let newState = Object.assign({}, this.state);
    newState.status.pending = true;
    this.setState(newState);
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

  handleAsync(input) {
    let newState = Object.assign({}, this.state);

    NameUtils.submitName(input)
      .then((res) => res.json())
      .then((res) => {
        let name = NameUtils.validateName(res);

        newState.status.pending = false;

        if (!name) {
          newState.status.message = "not a name";
          this.setState(newState);

        } else if (name === "no page found") {
          if (input !== this.state.inputValue) {
            this.handleAsync(this.state.inputValue);
          } else {
            newState.status.message = "no name found";
            this.setState(newState);
          }
        } else if (name[0] === "redirect") {
          this.handleAsync(name[1]);
          return;

        } else {
          DataUtils.passNameToDatabase(input, name).then(
            (member) => {
              newState.status.message = "success";
              this.setState(newState);
              this.props.updateList();
            },
            (err) => {
              if (err.status === 422) {
                newState.status.message = err.responseJSON.type;
                this.setState(newState);
              }
            }
          );
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newState = Object.assign({}, this.state);

    let corrected = this.state.inputValue.toLowerCase();
    corrected = corrected.split(" ");
    corrected = corrected.map((n) => n[0].toUpperCase() + n.slice(1));
    corrected = corrected.join(" ");
    this.handleAsync(corrected);

    this.setState(newState);
  }

  render() {
    let statusReport;
    if (!this.state.status.pending) {
      if (this.state.status.message === "success") {

        statusReport = <NameSuccess
          name={this.state.inputValue}
          close={() => this.closeError}/>;
      } else {
        statusReport = <NameError
          type={this.state.status.message}
          close={() => this.closeError}/>;
      }
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
