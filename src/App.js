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
        <button
          className="btn btnprimary btnlg btn-outline-success btn-sm"
          onClick = {() => this.checkAll()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </button>
				<h3 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>{headingText}</h3>
				{this.taskList()}
				</header>
			</div>
		);
	}
}
export default App;