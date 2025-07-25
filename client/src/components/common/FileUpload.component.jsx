import React from "react";

const FileUpload = ({ info, error, labelText }) => {
  return (
    <div className="form-group">
      <label htmlFor="exampleInputFile">{labelText}</label>
      <div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="exampleInputFile"
          />
          <label className="custom-file-label" htmlFor="exampleInputFile">
            Choose file
          </label>
        </div>
        <div className="input-group-append">
          <button className="input-group-text btn btn-outline-success" id>
            Upload
          </button>
        </div>
      </div>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FileUpload;
