import React, { Component } from "react";
import http from "../common/axiosCommands";
import config from "../config.json";

class StudentsBySkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      studentCount: 0,
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const selectedskill = this.state.value;
    const response = await http.get(
      `${config.URL}skills/${this.props.type}?skill=${selectedskill}`
    );
    const countStudentsByDate = await response.data;
    this.setState({ studentCount: countStudentsByDate });
  }

  render() {
    return (
      <React.Fragment>
        <div className="py-3">
          <div className="card mx-auto" style={{ width: "30rem" }}>
          <div className="card-body">
          <h5 className="card-title">
          Students enrolled count by {this.props.type} skill
          </h5>
          <form onSubmit={(event) => this.handleSubmit(event)}>
          <label className="mx-3" htmlFor="controlSelect">
          Pick a Skill:
          </label>
          <select
          className="form-control"
          id="controlSelect"
          value={this.state.value}
          onChange={(event) => this.handleChange(event)}
          >
          <option defaultValue="true">Select one skill</option>
          <option value="potionMaking">Potion Making</option>
          <option value="spells">Spells</option>
          <option value="quidditch">Quidditch</option>
          <option value="animagus">Animagus</option>
          <option value="apparate">Apparate</option>
          <option value="metamorphmagi">Metamorphmagi</option>
          <option value="parselongue">Parselongue</option>
          </select>
          <p>Students count={this.state.studentCount}</p>
          <div className="my-2">
          <button type="submit" className="btn btn-primary">
          Select
          </button>
          </div>
          </form>
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentsBySkills;
