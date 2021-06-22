import React, { Component } from "react";
import { validate, validateProperty } from "../common/validation";
import '../style/style.css'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      errors: {},
    };
  }

  componentDidMount() {
    const adminEmail = this.props.match.params.email;
    if (adminEmail === "new") return;
    const editAdmin = this.props.adminList.find(
      (admin) => admin.email === adminEmail
    );
    editAdmin.passwordConfirm = editAdmin.password;
    this.setState({ admin: editAdmin });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = validateProperty(
      event.target,
      this.state.admin.password
    );
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];

    const admin = { ...this.state.admin };
    const now = new Date();
    const id = now - new Date("1981-05-20");
    admin.id = id;
    admin[event.target.name] = event.target.value;
    this.setState({ admin, errors });
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = validate(this.state.admin);
    this.setState({ errors });
    if (errors) return;

    this.props.OnSaveAdmin(this.state.admin);
    event.target.reset();
    this.props.history.replace("/home");
  }

  render() {
    const { admin, errors } = this.state;
    return (
      <React.Fragment>
        
        <div className="gradient">
          <div className="col-sm-10 mx-auto pt-1">
            <h2 className="py-3">Admin Sign Up</h2>
          
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group col-sm-10">
            <label htmlFor="firstName">First Name</label>
            <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={admin.firstName}
            onChange={(event) => this.handleChange(event)}
            />
            </div>
            {errors.firstName && (
            <div className="alert alert-danger" role="alert">
            {errors.firstName}
            </div>
            )}
            
            <div className="form-group col-sm-10">
            <label htmlFor="lastName">Last Name</label>
            <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={admin.lastName}
            onChange={(event) => this.handleChange(event)}
            />
            </div>
            {errors.lastName && (
            <div className="alert alert-danger" role="alert">
            {errors.lastName}
            </div>
            )}
            
            <div className="form-group col-sm-10">
            <label htmlFor="email">Email address</label>
            <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={admin.email}
            onChange={(event) => this.handleChange(event)}
            />
            </div>
            {errors.email && (
            <div className="alert alert-danger" role="alert">
            {errors.email}
            </div>
            )}
            
            <div className="form-group col-sm-10">
            <label htmlFor="password">Password</label>
            <input
            type="password"
            className="form-control"
            value={admin.password}
            id="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
            />
            </div>
            {errors.password && (
            <div className="alert alert-danger" role="alert">
            {errors.password}
            </div>
            )}
            
            <div className="form-group col-sm-10">
            <label htmlFor="password2">Password Confirmation</label>
            <input
            type="password"
            className="form-control"
            value={admin.passwordConfirm}
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={(event) => this.handleChange(event)}
            />
            </div>
            {errors.passwordConfirm && (
            <div className="alert alert-danger" role="alert">
            {errors.passwordConfirm}
            </div>
            )}
            
            <button
            type="submit"
            className="btn btn-primary m-3"
            disabled={validate(this.state.admin)}
            >
            Save
            </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
