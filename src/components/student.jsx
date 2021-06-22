import React, { Component } from "react";
import SkillsTable from "./skillsTable";
import { validate, validateProperty } from "../common/validation";
import config from "../config.json";
import http from "../common/axiosCommands";
import '../style/style.css'

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        currentSkills: {},
        desireSkills: {},
      },
      currentSkills: {
        potionMaking: 1,
        spells: 1,
        quidditch: 1,
        animagus: 1,
        apparate: 1,
        metamorphmagi: 1,
        parselongue: 1,
      },
      desireSkills: {
        potionMaking: 1,
        spells: 1,
        quidditch: 1,
        animagus: 1,
        apparate: 1,
        metamorphmagi: 1,
        parselongue: 1,
      },
      errors: {},
    };
  }

  async componentDidMount() {
    const studentEmail = this.props.match.params.email;
    if (studentEmail === "new") return;
    const editStudent = await http.get(
      `${config.URL}/students/${studentEmail}`
    );
    if (!editStudent.data) {
      this.props.history.replace("/not-found");
      return;
    }
    this.setState({
      student: editStudent.data,
      currentSkills: editStudent.data.currentSkills,
      desireSkills: editStudent.data.desireSkills,
    });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = validateProperty(event.target);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];

    const student = { ...this.state.student };
    student[event.target.name] = event.target.value;
    this.setState({
      student,
      errors: errors || {},
    });
  }

  handleOnChangeSkills(event, skills) {
    const newSkills = { ...this.state[skills] };
    newSkills[event.target.name] = event.target.value;
    if (skills === "currentSkills")
      this.setState({
        currentSkills: newSkills,
      });
    else if (skills === "desireSkills")
      this.setState({
        desireSkills: newSkills,
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = validate(this.state.student);
    this.setState({ errors });
    if (errors) return;

    let newStudent = { ...this.state.student };
    newStudent.currentSkills = this.state.currentSkills;
    newStudent.desireSkills = this.state.desireSkills;

    this.props.onSaveStudent(newStudent);
    event.target.reset();
    this.props.history.replace("/home");
  }

  render() {
    const { student, errors } = this.state;
    return (
      <React.Fragment>
        <div className="gradient">
          <div className="col-sm-10 mx-auto">
            <h2 className="py-3 col-sm-10">Student</h2>
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group col-sm-10">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={student.firstName}
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
                value={student.lastName}
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
                    value={student.email}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>
                {errors.email && (
                  <div className="alert alert-danger" role="alert">
                  {errors.email}
                  </div>
                )}
                <div className="row">
                  <div className="col-sm-5 mx-auto">
                  <h4 className="my-2 text-justify col-sm-10">Current Skills</h4>
                  <SkillsTable
                  type="current"
                  onChange={(event) =>
                  this.handleOnChangeSkills(event, "currentSkills")
                  }
                  data={this.state.currentSkills}
                  />
                  </div>
                  {errors.currentSkills && (
                  <div className="alert alert-danger" role="alert">
                    {errors.currentSkills}
                  </div>
                  )}
                
                <div className="col-sm-5 mx-auto">
                  <h4 className="my-2 text-justify col-sm-10">Desier Skills</h4>
                  <SkillsTable
                  type="desier"
                  onChange={(event) =>
                  this.handleOnChangeSkills(event, "desireSkills")
                  }
                  data={this.state.desireSkills}
                  />
                  </div>
                </div>
                {errors.desiertSkills && (
                <div className="alert alert-danger" role="alert">
                {errors.desiertSkills}
                </div>
                )}
                
                <button
                  type="submit"
                  className="btn btn-primary mx-3 my-4"
                  disabled={validate(this.state.student)}
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

export default Student;
