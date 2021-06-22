import React from "react";
import MyChart from "./chart";
import StudentsByDate from "./searchDate";
import StudentsBySkills from "./searchBySkill";
import '../style/style.css'

const MyDashBoard = (props) => {
  return (
    <React.Fragment>
      <div className="gradient">
        <MyChart studentList={props.studentList} />
        <StudentsByDate />
        <StudentsBySkills type={"current"} />
        <StudentsBySkills type={"desire"} />
      </div>
    </React.Fragment>
  );
};

export default MyDashBoard;
