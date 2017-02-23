import React, { PropTypes, Component } from 'react';

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */

super();
    this.state = {
      todo: {}
  }

componenDidMount() {
  this.getToDo();
}

getToDo() {
  getToDo() {
    const url = 'https://react-on-rails.firebaseio.com/.json';
    //send `GET` request to the firebase db
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      this.setState({ todo: res.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

}

