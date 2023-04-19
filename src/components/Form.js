import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      alert("Inserire nome");
    } else {
      this.props.addTask(this.state.name);
      this.setState({ name: "" });
    }
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Cosa deve essere fatto?
          </label>
        </h2>
        <div className="btn-group input-group-sm">
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg form-control"
            name="text"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btnprimary btnlg btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        </div>
      </form>
    );
  }
}

export default Form;