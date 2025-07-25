import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleDate = ({
  selected,
  onChange,
  name,
  dateFormat,
  id,
  dateLabel,
  disabled,
}) => {
  //console.log(disabled);
  return (
    <div className="form-group">
      <label for={name} style={{ display: "block" }}>
        {dateLabel}
      </label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        name={name}
        dateFormat={dateFormat}
        id={id}
      />
      {/* 
      {disabled ? (
        <DatePicker
          selected={selected}
          onChange={onChange}
          name={name}
          dateFormat={dateFormat}
          id={id}
          disabled
        />
      ) : (
        <DatePicker
          selected={selected}
          onChange={onChange}
          name={name}
          dateFormat={dateFormat}
          id={id}
        />
      )} */}
    </div>
  );
};

export default SingleDate;
