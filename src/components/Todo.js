import React, { Component } from "react";

class Todo extends Component{
  constructor(props){
    super(props);
    this.editFieldRef = React.createRef();
    this.editButtonRef = React.createRef();
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
          <label className="todo-label" htmlFor={this.props.id}>
            Nuovo nome per {this.props.name}
          </label>
      <div class="input-group mb-3">
          <button
            type="button"
            className="btn todo-cancel btn-outline-warning btn-sm"
            onClick={() => this.setState({ isEditing : false })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
              <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
            <span className="visually-hidden">rinomina {this.props.name}</span>
          </button>
          <input
            id={this.props.id}
            className="todo-text form-control"
            type="text"
            value={this.newName}
            onChange={this.handleChange}
            ref={this.editFieldRef}
          />
        <div className="btn-group">
          <button type="submit" className="btn btn__primary todo-edit btn-outline-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
              <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            <span className="visually-hidden">nuovo nome per {this.props.name}</span>
          </button>
        </div>
      </div>
    </form>
  );
  viewTemplate = () => (
      <div class="input-group mb-3">
        <div className="form-check form-switch">
            <input 
              className="form-check-input"
              type="checkbox"
              value=""
              id={this.props.id}
              checked={this.props.completed} 
              onChange={() => this.props.toggleTaskCompleted(this.props.id)}
            />
            <label htmlFor={this.props.id}>
                {this.props.name}
            </label>
        </div>
        <div className="spacer2"></div>
        <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-info btn-sm"
              onClick={() => this.setState({ isEditing : true })}
              ref={this.editButtonRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg> <span className="visually-hidden">{this.props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => this.props.deleteTask(this.props.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg> <span className="visually-hidden">{this.props.name}</span>
            </button>
        </div>
      </div>
  );
  render() {
    return (
      <div className="todo">{this.state.isEditing ? this.editingTemplate() : this.viewTemplate()}</div>
    );
  }
}
export default Todo;