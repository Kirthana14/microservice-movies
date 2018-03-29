import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FormErrors } from './FormErrors';


//constructor
class RegisterForm extends Component {
  constructor (props) {
    super(props);
   
    this.state = {
      errors: {},
      username: '',
      password: '',
      password1: '',
      email: '',
      phone: '',
      formErrors: {username: '', email: '', phone: '', password: '', password1: ''},
      usernameValid: false,
      emailValid: false,
      phoneValid: false,
      passwordValid: false,
      password1Valid: false,
      formValid: false

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }


//change in the user input  
    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }


//validation of all user data
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let passwordValid = this.state.passwordValid;
    let password1Valid = this.state.password1Valid;
   
    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^([\w]{3,})$/i) ;
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.length >= 10 && value.match(/^([\d]{10})$/i) ;
        fieldValidationErrors.phone = phoneValid ? '': ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'password1':
        password1Valid = this.state.password === value;
        fieldValidationErrors.passwords = password1Valid ? '': ' not matched';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    emailValid: emailValid,
                    phoneValid: phoneValid,
                    passwordValid: passwordValid,
                    password1Valid: password1Valid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.emailValid && this.state.phoneValid && this.state.passwordValid && this.state.password1Valid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}


  handleInputChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.registerUser(this.state, (errorMessage) => {
      if (errorMessage) {
        this.props.createFlashMessage(errorMessage, 'error');
      }
    });
  }





  render () {
    const { username, email, phone, password , password1 } = this.state;
    return (
    

      <div className="row">
        <div className="col-md-6">
          <h1>Register</h1>
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
                  value={username}
                  onChange={this.handleUserInput} />
              </div>
            </div>

            <div className='form-group ${this.errorClass(this.state.formErrors.email)'>
              <label
                htmlFor='email'
                className='col-md-2 control-label'>
                Email-ID
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='email'
                  name='email'
                 // value={address}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.phone)'>
              <label
                htmlFor='phone'
                className='col-md-2 control-label'>
                Phone No
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='phone'
                  name='phone'
                 // value={address}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.password)'>
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
                  value={password}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.password1)'>
              <label
                htmlFor='password1'
                className='col-md-2 control-label'>
                Re-enter Password
              </label>
              <div className='col-md-10'>
                <input
                  type='password'
                  className='form-control'
                  id='password1'
                  name='password1'
                 // value={password1}
                  onChange={this.handleUserInput} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-offset-2 col-md-10'>
                <button
                  type='submit'
                  className='btn btn-success'
                  disabled={!this.state.formValid}
                >Sign up</button>
                &nbsp;
                <Link
                  to='/'
                  className='btn btn-primary'
                >Cancel</Link>
                <p>Already registered? <Link to='/login' >Log in</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm
