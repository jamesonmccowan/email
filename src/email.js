import React from 'react';
import './email.css';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      autocomplete: props.autocomplete || [],
      placeholder: props.placeholder || "example@example.com"
    };
  }

  // build new list of emails with a new blank email at the start
  addEmail = (event) => {
    this.setState(state => {
      const emails = state.emails.concat([{value: "", valid: false, edit: true}]);
      return {
        emails: emails
      };
    });
  }

  // build new list of emails minus email to be removed
  removeEmail = (index) => {
    return (event) => {
      event.stopPropagation();
      this.setState(state => {
        const emails = state.emails.filter((email, i) => i !== index);
        return {
          emails: emails
        };
      });
    }
  }

  // start editing email address
  editEmail = (index, suggestion) => {
    return (event) => {
      event.stopPropagation();
      this.setState(state => {
        const emails = state.emails.map((email, i) => {
          email.edit = i === index;
          if (i === index && suggestion) {
            email.value = suggestion;
            email.edit = false;
            email.valid = true;
          }
          return email;
        });

        return {
          emails: emails
        };
      });
    }
  }

  // stop editing email address
  endEditEmail = (index) => {
    return (event) => {
      //  onblur         or pressed enter          or pressed tab
      if (!event.keyCode || event.keyCode === 13 || event.keyCode === 9) {
        var self = this;
        setTimeout(function () {
          self.setState(state => {
            const emails = state.emails.map((email, i) => {
              // stop editing specific email, leave the rest as-is
              email.edit = (i === index ? false : email.edit);
              return email;
            });

            return {
              emails: emails
            };
          });
        }, 100); // delay prevents onBlur from interrupting other events such as clicking a suggestion or clicking the delete button
      }
    }
  }

  // validate email address input
  checkEmail = (index) => {
    return (event) => {
      let value = event.target.value;

      // regexp to recognize email strings
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // build new list of emails
      this.setState(state => {
        const emails = state.emails.map((email, i) => {
          if (i === index) {
            if (re.test(String(value).toLowerCase())) {
              email.valid = true;
            } else {
              email.valid = false;
            }
            email.value = value;
          }
          return email;
        });

        return {
          emails: emails
        };
      });
    }
  }

  render() {
    let email_blocks = this.state.emails.map((email, index) => {
      let content = [];
      if (email.edit) {
        content.push(
          <input
            key={ "i" + index }
            type="text"
            list="emailAutocomplete"
            value={ email.value }
            onInput={ this.checkEmail(index) }
            onBlur={ this.endEditEmail(index) }
            onKeyUp={ this.endEditEmail(index) }
            autoFocus
          />
        );
      } else {
        content.push(<b key={ "b" + index }>{email.value}</b>);
      }
      content.push(<button key={ "btn" + index } onClick={ this.removeEmail(index) }>x</button>);

      return (
        <div key={index} className={"emailItem " + (email.edit ? "emailEdit" : "") + " " + ((!email.valid && !email.edit) ? "emailInvalid" : "")} onClick={ this.editEmail(index) }>
          {content}
        </div>
      );
    });

    let data_list = <datalist id="emailAutocomplete">{ this.state.autocomplete.map((s, i) => <option key={"s" + i } value={ s } />) }</datalist>;

    return (<div className="email" onClick={ this.addEmail }>
      <span className="placeholder">{ this.state.emails.length === 0 && this.state.placeholder }</span>
      {email_blocks}
      {data_list}
    </div>);
  }
}

export default Email;
