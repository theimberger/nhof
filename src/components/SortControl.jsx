import React, { Component } from 'react';

class SortControl extends Component {
  constructor() {
    super();
    this.state = { showDropdown: false };
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }


  handleOptionSelect(option) {
    this.props.setSort(option);
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    const { sortType, setSort } = this.props;
    const { showDropdown } = this.state;

    const dropdownOptions = ['rank', 'date', 'first name']
      .filter((option) => option !== sortType);

    return (
        <div className='sort_control'>
          <div>
            sort by <span className='sort_type' onClick={ this.toggleDropdown } >{ sortType }▽</span>
          </div>
          <ul className={ `sort_dropdown ${ showDropdown ? '' : 'sort_dropdown--collapsed'}`}>
            { dropdownOptions.map((option) => (
              <li
                key={ option }
                onClick={ () => this.handleOptionSelect(option) }
              >
                { option }
              </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default SortControl;
