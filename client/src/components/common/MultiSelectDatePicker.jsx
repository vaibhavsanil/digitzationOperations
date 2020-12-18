import React, { Fragment } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./MultiSelectDates.syles.scss";

const MultiSelectDatePicker = ({
  id,
  labelText,
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,

  formWidth,
}) => {
  return (
    <div className="form-group">
      <label for={id}>{labelText}</label>
      <input
        type="text"
        placeholder={placeholder}
        type={type}
        className={classnames(` form-control date ${formWidth}`, {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

MultiSelectDatePicker.defaultProps = {
  type: "text",
};

MultiSelectDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

export default MultiSelectDatePicker;
