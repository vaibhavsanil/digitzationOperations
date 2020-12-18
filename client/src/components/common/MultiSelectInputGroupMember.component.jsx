import React, { useEffect, useContext } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import BookContext from "../../context/book/bookContext";

const MultiSelectInput = ({
  name,
  placeholder,
  value,

  error,
  info,
  onChange,
  options,
  labelText,
  id,
  formWidth,
}) => {
  console.log("[MultiSelectInput Member] options value ", options);
  return (
    //   https://kentcdodds.com/blog/introducing-downshift-for-react

    <div className="form-group">
      <label for={id}>{labelText}</label>
      <select
        className="select2"
        multiple="multiple"
        data-placeholder={placeholder}
        style={{ width: "100%" }}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options ? (
          options.map((participant) => (
            <option value={participant._id}>{participant.name_eng}</option>
          ))
        ) : (
          <option>Loading Items ...</option>
        )}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
      {/* <div className="form-group">
      <label for={id}>{labelText}</label>
      <select
        className={classnames(`form-control form-control ${formWidth}`, {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>

      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div> */}
    </div>
  );
};

// MultiSelectInput.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   info: PropTypes.string,
//   error: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   options: PropTypes.array.isRequired,
// };

// TextFieldGroup.defaultProps = {
//     type: 'text'
// };

export default MultiSelectInput;
