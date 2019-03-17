import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';

const toDoItems = [
  {
    id: 1,
    title: "Task 1",
    description: "Learn Django",
    completed: false
  },
  {
    id: 2,
    title: "Task 2",
    description: "Learn React",
    completed: false
  },
  {
    id: 3,
    title: "Task 3",
    description: "Implement Both.",
    completed: false
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      toDoList: toDoItems
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = (item) => {
    this.toggle();
    alert("Save" + JSON.stringify(item));
  }

  handleDelete = (item) => {
    alert("Delete" + JSON.stringify(item));
  }

  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  };

  displayCompletedItems = status => {
    if(status) {
      return this.setState({
        viewCompleted: true
      });
    }
    return this.setState({
      viewCompleted: false
    });
  };

  renderTabList = () => {
    return (
        <div className="my-5 tab-list">
          <span onClick={() => this.displayCompletedItems(true)}
                className={this.state.viewCompleted === true ? "active" : ""}>
            completed
          </span>
          <span onClick={() => this.displayCompletedItems(false)}
                className={this.state.viewCompleted ? "" : "active"}>
            incomplete
          </span>
        </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;

    const newItems = this.state.toDoList.filter(
        item => item.completed === viewCompleted
    );
    return newItems.map(item => (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
              }`} title={item.description}>
            {item.title}
          </span>
          <span>
            <button type="button" className="btn btn-md btn-outline-info mr-2">Edit</button>
            <button type="button" className="btn btn-md btn-outline-danger" onClick={() => this.handleDelete(item)}>Remove</button>
          </span>
        </li>
    ));
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="text-uppercase text-center my-4"> To Do List </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button type="button" className="btn btn-md btn-outline-dark" onClick={this.createItem}>Add task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
            <Modal activeItem={this.state.activeItem}
                   toggle={this.state.toggle}
                   onSave={this.handleSubmit}
            />
        ) : null}
      </div>
    );
  }
}

export default App;
