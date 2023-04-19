import './App.css';
import React, { Component } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import axios from "axios";

const FILTER_MAP = {
  Tutte: () => true,
  Attive: (task) => !task.completed,
  Complete: (task) => task.completed
};   
const FILTER_NAMES = Object.keys(FILTER_MAP);

class App extends Component{
  constructor(props) {
    super(props);    
    this.state = {
      tasks: [],
      filter: 'Tutte'
    };
  }
  componentDidMount(){
    axios.get('http://localhost:3001/todos').then(
      res => {
        this.setState({tasks: res.data});
      }
    )
  }
  checkAll = () =>{
    axios.post('http://localhost:3001/todo/checkAll').then(
      res => {
        this.setState({tasks: res.data});
      }
    );
  }
  toggleTaskCompleted = (id) => {
    axios.post('http://localhost:3001/todo/checkEdit', { id }).then(
      res => {
        this.setState({tasks: res.data});
      }
    );
  }
  editTask = (id, newName) => {
    axios.post('http://localhost:3001/todo/edit', { id, newName }).then(
      res => {
        this.setState({tasks: res.data});
      }
    );
  }
  deleteTask = (id) => {
    axios.post('http://localhost:3001/todo/delete', { id }).then(
      res => {
        this.setState({tasks: res.data});
      }
    );
  }
  addTask = (name) => {
    axios.post('http://localhost:3001/todo/add', { name }).then(
      res => {
        this.setState({tasks: res.data});
      }
    );
  }
  taskList = () => {    
    const tastksState = this.state.tasks
    return tastksState.filter(FILTER_MAP[this.state.filter]).map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
      />
    ))
  };

  componentDidUpdate(prevProp, prevState, snapshot){
    if (prevState.tasks !== this.state.tasks) {
      if (prevState.length - prevState.tasks === -1) {
        this.headingText.current.focus();
      }
    }
  }

  setFilter = (name) => {
    switch(name){
      case "Tutte":
        this.setState({ filter : "Tutte" });
        break;
      case "Attive":
        this.setState({ filter : "Attive" });
        break;
      case "Complete":
        this.setState({ filter : "Complete" })
        break;
      default:
        this.setState({ filter : "Tutte" });        
    }
  }
	render() {  
    const conteggio = this.taskList().length;
    const tasksNoun = this.taskList().length !== 1 ? 'rimaste' : 'rimasta';
    const headingText = `${conteggio} attività ${tasksNoun}`;
    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === this.filter}
        setFilter={this.setFilter}
      />
    ));
		return (
			<div className="App">
				<header className="App-header">
				<h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
				<div className="spacer">
					<div className="filters btn-group stack-exception">
						{filterList}
					</div> 
				</div>
        {/* <CheckButton /> */}
        <button
          className="btn btnprimary btnlg btn-outline-success btn-sm"
          onClick = {() => this.checkAll()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 18">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </button>
				<h2 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>{headingText}</h2>
				<ul
					className="todo-list stack-exception"
					aria-labelledby="list-heading"
				>
					{this.taskList()}
				</ul>
				</header>
			</div>
		);
	}
}
export default App;