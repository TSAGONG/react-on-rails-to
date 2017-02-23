import React, { Component } from 'react';
import axios from 'axios';



class Input extends Component {

  createMessage() {
    axios({
      method:'post',
      url: `https://tweedr-16e26.firebaseio.com/.json`,
      data:{
        message:this.message.value,
      }

    }).then( () => {
      this.props.getTodo();
      this.props.addEvent();
      this.message.value= "";
    });

    }


  render() {
    return (
      <div>
      <input type="text" ref={(input) => this.message = input} placeholder="do Something" className="focus" /><br/><br/>
      <button type="submit" onClick={()=> this.createMessage()}  id="button">Add it</button>
    </div>
    )
  }
}

Input.propTypes = {
  addEvent: React.PropTypes.func.isRequired
}

export default Input;
