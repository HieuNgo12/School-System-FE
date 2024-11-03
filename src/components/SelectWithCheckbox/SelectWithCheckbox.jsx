import { default as ReactSelect, components } from "react-select";
import React, { useEffect, useState } from "react";
import { alphabet } from "./data.jsx";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

function SelectWithCheckBox({ list, setList, state,setState,teacherPositionList, ...props }) {
  const handleChange = (selected) => {
    console.log(state);
    setState({
      optionSelected: selected,
    });
  };
  useEffect(() => {
    const list = teacherPositionList.map((teacherPosition) => {
      return {
        label: teacherPosition.name,
        value: teacherPosition.name,
      };
    });
    setList(list);
  }, []);
  return (
    <div>
      {list.length ? (
        <ReactSelect
          options={list}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          onChange={handleChange}
          value={state.optionSelected}
          // Hide dropdown list  when select any item
          // closeMenuOnSelect={true}

          //Selected Item Remove in dropdown list
          // hideSelectedOptions={true}
        />
      ) : null}
    </div>
  );
}

export default SelectWithCheckBox;
