import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FormErrors } from './FormErrors';

// constructor
class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      username: '',
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      formValid: false,
     
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }


//change by the user
    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}


//validation of username and password
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^([\w%+-]+)([\w-]+)+([\w]{1,})$/i);
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }


//validating the form
  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
}


//change in the input
  handleInputChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


//on submit events
  onSubmit (event) {
    event.preventDefault();
    this.props.loginUser(this.state, (errorMessage) => {
      if (errorMessage) {
        this.props.createFlashMessage(errorMessage, 'error');
      }
    });
  }


//actual render
  render () {
    const { username, password } = this.state;
    return (
     
      <div className="row">
        <div className="col-md-6">
          <h1>Login</h1>
          <hr/><br/>
          <form
           
            onSubmit={(event) => {
              this.onSubmit(event)
            }}
            
            className='form-horizontal'>
            <div>
          <FormErrors formErrors={this.state.formErrors} />
            </div>
            
            <div className='form-group ${this.errorClass(this.state.formErrors.username)}'>
              <label
                htmlFor='username'
                className='col-md-2 control-label'>
                Username
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.password)}'>
              <label
                htmlFor='password'
                className='col-md-2 control-label'>
                Password
              </label>
              <div className='col-md-10'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-offset-2 col-md-10' >
                <button
                  type='submit'
                  className='btn btn-success' 
                  disabled={!this.state.formValid}
                >Log in</button>
                &nbsp;
                <Link
                  to='/'
                  className='btn btn-primary'
                >Cancel</Link>
                <p>Need to <Link to='/register'>register</Link>?</p>
              </div>
            </div>
           
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
