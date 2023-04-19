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
        <div className="btn-group">
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
            Aggiungi
          </button>
        </div>
      </form>
    );
  }
}

export default Form;