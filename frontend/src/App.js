import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';
import axios from 'axios';

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
      toDoList: []
    };
  }


  /*
   * Fetching the data from database on componentDidMount.
   */
  componentDidMount() {
    this.refreshList();
  }

  /*
   * Method to fetch data from database.
   */
  refreshList = () => {
    axios.get("/api/todos").then(response => this.setState({
      toDoList: response.data
    })
    ).catch(err => console.log(err));
  };

  /*
   * Method to toggle modal.
   */
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  /*
   * Method to post data to database.
   */
  handleSubmit = (item) => {
    if(item.id) {
      axios.put(`/api/todos/${item.id}/`, item).then(response => {
        console.log(response.data);
        this.toggle();
        this.refreshList();
      });
    } else {
      axios.post("/api/todos/", item).then(response => {
      console.log(response.data);
      this.toggle();
      this.refreshList();
    }).catch(err => console.log(err));
    }
  };

  /*
   * Method to delete data from database.
   */
  handleDelete = (item) => {
    axios.delete(`/api/todos/${item.id}`).then(response => {
      this.refreshList();
    }).catch(err => console.log(err));
  };

  /*
   * Method to set item.
   */
  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  };

  /*
   * Method to edit item.
   */
  editItem = (item) => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  };

  /*
   * Method to display list of completed items.
   */
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
            <button type="button" className="btn btn-md btn-outline-info mr-2" onClick={() => this.editItem(item)}>Edit</button>
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
                   toggle={this.toggle}
                   onSave={this.handleSubmit}
            />
        ) : null}
      </div>
    );
  }
}

export default App;
