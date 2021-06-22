import React from "react";
const SkillsTable = (props) => {
  const skills = props.data;

  return (
    <React.Fragment>
      <table className="table-sm">
        <thead>
          <tr>
            <th scope="col-5">Skill</th>
            <th scope="col-5">Level</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(skills).map((skill) => (
            <tr key={`${props.type}${skill.replace(" ", "")}`}>
              <td className="pt-3 mt-1">{skill}</td>
              <td>
                <div className="form-group ">
                  <label
                    className="sr-only"
                    htmlFor={`${props.skillType}${skill.replace(" ", "")}level`}
                  >
                    {`Current ${skill} level`}--
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    max="5"
                    id={skill}
                    name={skill}
                    value={props.data[skill]}
                    onChange={(event) => props.onChange(event)}
                  ></input>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default SkillsTable;
