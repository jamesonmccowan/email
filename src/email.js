import React from 'react';
import './email.css';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emails: [
        { value: "test@test.com", valid: true, edit: false},
        { value: "test", valid: false, edit: false },
    ]};
  }
  checkEmail = (index) => {
    return (event) => {
      let value = event.target.value;

      // regexp to recognize email strings
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // build new list of emails
      this.setState(state => {
        const emails = state.emails.map((item, i) => {
          if (i === index) {
            if (re.test(String(value).toLowerCase())) {
              item.valid = true;
            } else {
              item.valid = false;
            }
            item.value = value;
          }
          return item;
        });

        return {
          emails,
        };
      });
    }
  }
  render() {
    return <div className="email">
      {this.state.emails.map((email, index) => (
        <div className="emailItem" key={index}>
          <input type="text" value={ email.value } onInput={ this.checkEmail(index) }/>
        </div>
      ))}
    </div>
  }
}

export default Email;
