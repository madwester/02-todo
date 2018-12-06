import React, { Component } from 'react';
import './App.css';

let currentId = 5;
const newId = () => {
  currentId += 1;
  return currentId;
}

class App extends Component {
  state = {
    filter : 'all',
    newTodo: '',
    items: [
      { id: 1, completed: true, text: 'Do stuff'},
      { id: 2, completed: true, text: 'Do stuff'},
      { id: 3, completed: true, text: 'Do stuff'},
      { id: 4, completed: true, text: 'Do stuff'},
      { id: 5, completed: true, text: 'Do stuff'}
    ]
  }

  addNewTodo = (event) => {
    event.preventDefault();
    const { items, newTodo } = this.state;
    const newItems = [
      ...items,
        { id: newId(), completed: false, text: newTodo}
    ]
    this.setState({ items: newItems })
  }

  deleteTodo = (id) => {
    const { items } = this.state;
    const newItems = items.filter(item => item.id !== id)
    this.setState({ items: newItems })
  }

  onChange = (event) => {
    const { items } = this.state;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({ [event.target.name]: value })
  }

  onItemChange = (id, event) => {
    const { items } = this.state;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    const newItems = items.map((item) => {
      if (item.id === id){
        return {
          ...item,
          [event.target.name]: value
        };
      }
      return item;
    })
    this.setState({ items: newItems })
  }

  render() {
    const { items, newTodo, filter } = this.state;
    return (
      <div className="App">
      <form onSubmit={this.addNewTodo}>
        <input name="newTodo" className="newTodoInput" value={newTodo} onChange={this.onChange}/>
        <button className="btn">Submit</button>
      </form>
      <label>All</label><input onChange={this.onChange} name="filter" type="radio" value="all" checked={filter === 'all'} />
      <label>Active</label><input onChange={this.onChange} name="filter" type="radio" value="active" checked={filter === 'active'} />
      <label>Completed</label><input onChange={this.onChange} name="filter" type="radio" value="completed" checked={filter === 'completed'} />
        <ul>
          {items
            .filter(item => {
              switch (filter) {
                case 'active':
                  return !item.completed;
                break;
                case 'completed':
                  return item.completed;
                default:
                  return true;
              }
            })
          .map(item =>
          <li>
            <input name="completed" onChange={(event) => this.onItemChange(item.id, event)} type="checkbox" checked={item.completed}></input>
            <input name="text" onChange={(event) => this.onItemChange(item.id, event)} value={item.text}></input>
            <button onClick={() => this.deleteTodo(item.id)}>X</button>
          </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
