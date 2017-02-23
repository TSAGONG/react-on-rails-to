import React from 'react';
import axios from 'axios';

class Todo extends React.Component {
  constructor(){
    super();
    this.state= {
      edit:false
    }
  }
  eventDelete(key) {
    axios.delete(`https://tweedr-16e26.firebaseio.com/${key}.json`)
    .then((res) => {this.props.getTodo();
                   this.props.addEvent();
                 })
  }

  eventEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://tweedr-16e26.firebaseio.com/${key}.json`, {
      message:this.editmessage.value,

    })
    .then((res) => {
      this.props.getTodo();
      this.props.addEvent();
    })
  }

  editShow() {
    const { todo } =this.props;
    return (
      <div>
      <textarea className="edit-field" ref={(text)=>this.editmessage=text} defaultValue={todo[this.props.toShow].message} /><br/>
      <button type="submit" onClick={() => this.eventEdit(this.props.toShow)} className="flat">
        Save
      </button>
      <button type="submit" onClick={()=> this.setState({edit:!this.state.edit})}>
          Cancel
        </button>
      </div>

    )
  }

  normalShow() {
    const { todo } = this.props;
    return (
    <li className="eachLi">
      Message: {todo[this.props.toShow].message}
      <br/>
    <div className="buttons">
      <button type="submit" className="flat" onClick={() => this.eventEdit(this.props.toShow)} className="flat">Edit</button>
      <button type="submit" className="flat" onClick={() => this.eventDelete(this.props.toShow)} className="flat">Delete</button>
    </div>
  </li>
    )
  }
  render() {
    if(!this.state.edit){
      return (this.normalShow());
    }
    else{
      return (this.editShow());
    }
  }
}


export default Todo;
