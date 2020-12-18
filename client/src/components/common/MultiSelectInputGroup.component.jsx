import React, { useEffect, useContext } from "react";
//import MultiSelect from "react-multi-select-component";
// import classnames from "classnames";
// import PropTypes from "prop-types";

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
  return (
    //   https://kentcdodds.com/blog/introducing-downshift-for-react
    // Refer to the multiselect  https://www.youtube.com/watch?v=oYFphb9rZIk&t=29s&ab_channel=AjayJagtap
    //https://www.youtube.com/watch?v=pGagVWf6Atc&ab_channel=TannerLinsley
    //https://stackoverflow.com/questions/38276462/onchange-doesnt-work-with-react-and-select2
    //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
    // https://github.com/Khan/react-multi-select
    //https://github.com/harshzalavadiya/react-multi-select-component
    <div className="form-group">
      <label for={id}>{labelText}</label>
      <select
        className="select2"
        multiple="multiple"
        data-placeholder={placeholder}
        style={{ width: "100%" }}
        name={name}
        value={value}
        //onChange={onChange}

        id="datesSelect"
      >
        {options ? (
          options.map((link) => <option value={link}>{link}</option>)
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
