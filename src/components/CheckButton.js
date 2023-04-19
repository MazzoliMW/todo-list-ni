import React, { Component } from "react";
import axios from "axios";

class CheckButton extends Component{
  checkAll(){
    const updatedTasksAll = axios.post('http://localhost:3001/todo/checkAll').then(
      res => {
        debugger;
        console.log("-------");
        console.log(res.data);
        console.log("-------");
        debugger;
        this.setState({tasks: res.data});
        debugger;
      }
    );
    console.log(updatedTasksAll);
  }
  render() {
    return (
      <button
        type="submit"
        className="btn btnprimary btnlg btn-outline-success"
        onClick = {this.checkAll}
      >
        Completa Tutto
      </button>
    );
  }
}

export default CheckButton;