import React, { Component } from "react";
import { validate, validateProperty } from "../common/validation";
import '../style/style.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  componentDidUpdate() {
    if (this.props.currentAdmin) this.props.history.replace("/home");
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = validateProperty(event.target);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];

    const account = { ...this.state.account };
    account[event.target.name] = event.target.value;
    this.setState({ account, errors: errors || {} });
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = validate(this.state.account);
    this.setState({ errors });
    if (errors) return;
    this.props.onLogin(this.state.account);
    event.target.reset();
  }

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="gradient" style={{height:'91.2vh'}}>
          <div className="col-sm-10 mx-auto">
            <h2 className="py-3 col-sm-10">Admin Log In</h2>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group col-sm-10">
                <label htmlFor="email">Email address</label>
                <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={account.email}
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
                id="password"
                name="password"
                value={account.password}
                onChange={(event) => this.handleChange(event)}
                />
              </div>
              {errors.password && (
                <div className="alert alert-danger" role="alert">
                  {errors.password}
                </div>
                )}
              <button
              type="submit"
              className="btn btn-primary m-3"
              disabled={validate(this.state.account)}
              >
              Log In
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
