import React, { Component } from "react";
import http from "../common/axiosCommands";
import config from "../config.json";

class StudentsByDate extends Component {
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
    let selectedDate = this.state.value;
    selectedDate = selectedDate.replaceAll("-", "/");
    const response = await http.get(
      `${config.URL}students/createdOn?date=${selectedDate}`
    );
    const countStudentsByDate = await response.data;
    this.setState({ studentCount: countStudentsByDate });
  }
  render() {
    return (
      <React.Fragment>
        <div className="py-3">
          <div
          className="card mx-auto text-justify"
          style={{ width: "30rem" }}
          >
          <div className="card-body">
          <h5 className="card-title">Students enrolled count by date</h5>
          <form
          className="card-text"
          onSubmit={(event) => this.handleSubmit(event)}
          >
          <label className="my-1" htmlFor="mydate">
          Pick a date:
          </label>
          <input
          type="date"
          id="mydate"
          value={this.state.value}
          onChange={(event) => this.handleChange(event)}
          />
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

export default StudentsByDate;
