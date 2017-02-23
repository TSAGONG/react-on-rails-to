import React, { PropTypes, Component } from 'react';
// import './App.css';
import Input from './Input';
import Todo from './Todo';
import Todolist from './Todolist';
// import base from './base';
import axios from 'axios';

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
   constructor() {
    super();
    this.state = {
      todo: {},
    }

    this.addEvent = this.addEvent.bind(this);
    this.getTodo= this.getTodo.bind(this);
  }
  componentDidMount() {
    this.getTodo();
  }

  getTodo() {
    const url = 'https://tweedr-16e26.firebaseio.com//.json';
    //send `GET` request to the firebase db
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      this.setState({ todo: res.data })

        // This line flips the order of the array, so the newest tweed is on top
        // Then we set that flipped array to state
    })

    // .catch is a way for any errors in the db request to be thrown into
    // we console log that error, so as developers we have error code to read/fix
    .catch((error) => {
      console.log(error);
    })
  }

  addEvent() {
    if(this.state.todo){
      let feed=Object.keys(this.state.todo)
      .reverse()
      .map((key,i) => {
        return (
          <Todo
            key={key}
            getTodo={this.getTodo}
            addEvent={this.addEvent}
            toShow={key}
            todo={this.state.todo} />
              )
      })
      return feed;
    }
  }

  render() {
    console.log(this.state.todo)
    return (
      <div className="App">
        <div className="App-header">
          <h1>TODO App</h1>
          <Input
            getTodo={this.getTodo}
            addEvent={this.addEvent}
             />
        </div>
        <br/>
        <br/>
        <div className="feed-list">
          <br/>
          <br/>
        <Todolist
          addEvent={this.addEvent}
          />
        </div>
      </div>
    );
  }
}
