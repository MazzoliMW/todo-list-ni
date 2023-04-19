import React, { Component } from "react";

class Todo extends Component{
  constructor(props){
    super(props);
    this.editFieldRef = React.createRef();
    this.editButtonRef = React.createRef();
    //this.handleChange = this.handleChange.bind(this);
    this.state = {
      isEditing : false,
      newName : ''
    }
  }

  componentDidUpdate(prevProp, prevState, snapshot){
    if (prevState.isEditing !== this.state.isEditing) {
      if (!prevState.isEditing && this.state.isEditing) {
        this.editFieldRef.current.focus();
      }
      if (prevState.isEditing && !this.state.isEditing) {
        this.editButtonRef.current.focus();
      }
    }
  }    
  handleChange = (e) => {
    this.setState({ newName : e.target.value })
  }  
  handleSubmit = (e) => {
    if(this.state.isEditing === ''){
      this.setState({ isEditing : false })
      alert("Inserire nome");
    }else{
      e.preventDefault();
      this.props.editTask(this.props.id, this.state.newName);
      this.setState({ newName : "" })
      this.setState({ isEditing : false })
    }
  }
     
  editingTemplate = () => (
    <form className="stack-small" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={this.props.id}>
          Nuovo nome per {this.props.name}
        </label>
        <input
          id={this.props.id}
          className="todo-text form-control"
          type="text"
          value={this.newName}
          onChange={this.handleChange}
          ref={this.editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel btn-outline-warning"
          onClick={() => this.setState({ isEditing : false })}
        >
          Cancella
          <span className="visually-hidden">rinomina {this.props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit btn-outline-primary">
          Salva
          <span className="visually-hidden">nuovo nome per {this.props.name}</span>
        </button>
      </div>
    </form>
  );
  viewTemplate = () => (
    <li className="todo stack-small">
        <div className="c-cb form-check">
            <input 
              className="form-check-input"
              type="checkbox"
              value=""
              id={this.props.id}
              checked={this.props.completed} 
              onChange={() => this.props.toggleTaskCompleted(this.props.id)}
            />
            <label className="todo-label form-check-label" htmlFor="todo-0">
                {this.props.name}
            </label>
        </div>
        <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => this.setState({ isEditing : true })}
              ref={this.editButtonRef}
            >
              Modifica <span className="visually-hidden">{this.props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => this.props.deleteTask(this.props.id)}
            >
              Elimina <span className="visually-hidden">{this.props.name}</span>
            </button>
        </div>
    </li>
  );
  render() {
    return (
      <li className="todo">{this.state.isEditing ? this.editingTemplate() : this.viewTemplate()}</li>
    );
  }
}
export default Todo;