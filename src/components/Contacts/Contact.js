import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Contact extends Component {
  state = {
    showContentInfo: false
  };

  // Default Binding

  // function display(){ console.log(this); // 'this' will point to the global object}
  // display();
  // This is a plain function call. The value of this inside the display() method in this case is the window — or the global — object in non-strict mode. In strict mode, the this value is undefined.

  // Implicit binding
  // var obj = { name: 'Saurabh', display: function(){   console.log(this.name); // 'this' points to obj  }};
  // obj.display(); // Saurabh
  // When we call a function in this manner — preceded by a context object — the this value inside display() is set to obj.

  // But when we assign this function reference to some other variable and invoke the function using this new function reference, we get a different value of this inside display() .

  // var name = "uh oh! global";var outerDisplay = obj.display;outerDisplay(); // uh oh! global
  // In the above example, when we call outerDisplay(), we don’t specify a context object. It is a plain function call without an owner object.
  //In this case, the value of this inside display() falls back to default binding. It points to the global object or undefined if the function being invoked uses strict mode.

  // to use this in custom method or function we have to bind this (which class type)
  // we cam bind it in constructor like  this.onShowClick = this.onShowClick.bind(this)
  // or we can bind this from where it is called like onClick={this.onshowClick.bind(this)}
  // or we can simply use arrow function that have this binding to class
  // onShowClick() {
  //   console.log(this.state); //this wiill point global var which is undefind in this case
  // }

  //Instead of this we can add inline function
  // onShowClick = () => {
  //   this.setState({ showContentInfo: !this.state.showContentInfo });
  // };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContentInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={() =>
                    this.setState({
                      showContentInfo: !this.state.showContentInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContentInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">email: {email}</li>
                  <li className="list-group-item">phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
