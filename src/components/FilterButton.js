import React, { Component } from "react";

class FilterButton extends Component{
  render() {
    const { name, isPressed, setFilter } = this.props;
    return (
      <button
        type="button"
        className="btn toggle-btn btn-secondary"
        aria-pressed={isPressed}
        onClick={() => setFilter(name)}
      >
          <span className="visually-hidden">Mostra </span>
          <span>{name}</span>
          <span className="visually-hidden">Attività</span>
      </button>
    );
  }
}

export default FilterButton;