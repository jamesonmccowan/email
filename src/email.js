import React from 'react';
import './email.css';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emails: [
        { value: "a@test.com", valid: true, edit: false},
        { value: "b@test.com", valid: true, edit: false},
        { value: "c@test.com", valid: true, edit: false},
        { value: "d@test.com", valid: true, edit: false},
        { value: "e@test.com", valid: true, edit: false},
    ], autocomplete: props.autocomplete};
  }

  // build new list of emails with a new blank email at the start
  addEmail = (event) => {
    this.setState(state => {
      const emails = [{value: "", valid: false, edit: true}].concat(state.emails);
      return {
        emails: emails, autocomplete: state.autocomplete
      };
    });
  }

  // build new list of emails minus email to be removed
  removeEmail = (index) => {
    return (event) => {
      this.setState(state => {
        const emails = state.emails.filter((email, i) => i !== index);
        return {
          emails: emails, autocomplete: state.autocomplete
        };
      });
    }
  }

  // start editing email address
  editEmail = (index, suggestion) => {
    return (event) => {
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
          emails: emails, autocomplete: state.autocomplete
        };
      });
    }
  }

  // stop editing email address
  endEditEmail = (index) => {
    return (event) => {
      var self = this;
      setTimeout(function () {
        self.setState(state => {
          const emails = state.emails.map((email, i) => {
            email.edit = (i === index ? false : email.edit);
            return email;
          });

          return {
            emails: emails, autocomplete: state.autocomplete
          };
        });
      }, 100); // delay prevents onBlur from interrupting other events such as clicking a suggestion or clicking the delete button
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
          emails: emails, autocomplete: state.autocomplete
        };
      });
    }
  }

  render() {
    let new_email_button = <button className="emailPlus" onClick={ this.addEmail } >+</button>;

    let email_blocks = this.state.emails.map((email, index) => {
        let content = [];
        if (email.edit) {
            content.push(
                <input key={ "i" + index } type="text" value={ email.value } onInput={ this.checkEmail(index) } onBlur={this.endEditEmail(index)} autoFocus />
            );

            let suggestions = this.state.autocomplete.filter((suggestion) => suggestion && suggestion.indexOf(email.value) !== -1);

            content.push(<ul key={ "ul" + index } className="suggestions">{ suggestions.map((s, i) => <li key={"s" + i } onClick={ this.editEmail(index, s) }>{ s }</li>) }</ul>);
        } else {
            content.push(<b key={ "b" + index } onClick={ this.editEmail(index) }>{email.value}</b>);
        }
        content.push(<button key={ "btn" + index } onClick={ this.removeEmail(index) }>x</button>);

      return (
        <div key={index} className={"emailItem " + (email.edit ? "emailEdit" : "") + " " + ((!email.valid && !email.edit) ? "emailInvalid" : "")}>
          {content}
        </div>
      );
    });


    return (<div className="email">
      {new_email_button}
      {email_blocks}
    </div>);
  }
}

export default Email;
