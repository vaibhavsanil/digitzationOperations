import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  id,
  labelText,
  formWidth,
  required,
  inline_style,
}) => {
  return (
    <div className={`form-group ${inline_style}`}>
      <label for={id}>{labelText}</label>
      {/* if(disabled){
        <input
          type={type}
          className={classnames(`form-control form-control ${formWidth}`, {
            "is-invalid": error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          id={id}
          required

        />
      } */}

      {required ? (
        <input
          type={type}
          className={classnames(`form-control form-control  ${formWidth}`, {
            "is-invalid": error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          id={id}
          required
          autocomplete="off"
        />
      ) : (
        <input
          type={type}
          className={classnames(`form-control form-control ${formWidth}`, {
            "is-invalid": error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          id={id}
          autocomplete="off"
        />
      )}

      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  required: PropTypes.bool,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
