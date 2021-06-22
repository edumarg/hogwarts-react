import React from "react";

const SkillForm = ({ type, index, ...rest }) => {
  return (
    <React.Fragment className="d-flex flex-row justify-content-between">
      <div className="form-group">
        <label htmlFor={`${type}Skill${index}`}>
          <select className="form-control form-control-sm">
            <option defaultValue>Skill...</option>
            <option value="potionMaking">Potion Making</option>
            <option value="spells">Spells</option>
            <option value="quidditch">Quidditch</option>
            <option value="animagus">Animagus</option>
            <option value="apparate">Apparate</option>
            <option value="metamorphmagi">Metamorphmagi</option>
            <option value="parcelongue">Parcelongue</option>
          </select>
        </label>
        <label htmlFor={`${type}Skill${index}Level`}>
          <select className="form-control form-control-sm">
            <option defaultValue>Level...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
      </div>
    </React.Fragment>
  );
};

export default SkillForm;
