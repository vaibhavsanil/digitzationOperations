import React, { Component, useContext, useState } from "react";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import FileUploadForm from "../common/FileUpload.component";
// import MultiSelectDate from "../common/MultiSelectDatePicker";
import MultiSelectDatePicker from "../common/MultiSelectDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SingleDate from "../common/SingleDate-component";

// Import Book Context

import BookContext from "../../context/book/bookContext";

//Import Alert Context
import AlertContext from "../../context/alert/alertContext";

import { CUSTOMER, modalHeaderBackColour } from "../../constants/index";

const AddBook = ({
  currentBookState,
  currentBookSetState,
  onChange,
  onSubmit,
  onChangeDate,
}) => {
  const bookContext = useContext(BookContext);
  const { bookId, ...otherCollectionProps } = currentBookState;

  const { errors } = bookContext;

  // Select options for status
  const optionsSession = [
    { label: "* Select Place Of Session", value: 0 },
    { label: "Bangalore", value: "Bangalore" },
    { label: "Belegavi", value: "Belegavi" },
  ];
  const optionsBinding = [
    { label: "--Binding Status--", value: 0 },
    { label: "UN-BINDED", value: false },
    { label: "BINDED", value: true },
  ];

  return (
    <div className="modal fade" id="modal-lg">
      <div className="modal-dialog modal-lg">
        <form onSubmit={onSubmit}>
          <div className="modal-content">
            <div
              className="modal-header"
              style={modalHeaderBackColour(CUSTOMER)}
            >
              <h4 className="modal-title">Add New Book</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Book ID Row */}
              <div className="row">
                <div class="col-sm">
                  {/* <h4 style={{ marginLeft: "0 25px" }}>
                    Book ID: <span className="bookId-number">54</span>{" "}
                  </h4> */}
                  <TextFieldGroup
                    placeholder="Book ID"
                    name="bookId"
                    value={otherCollectionProps.bookId}
                    onChange={onChange}
                    error={errors.bookId}
                    id="bookId"
                    labelText="Book Id"
                    formWidth="col-4"
                  />
                </div>
                <div class="col-sm"></div>
                {/* Book ID Row End */}
              </div>
              {/* <form onSubmit={onSubmit}> */}
              <div class="row">
                <div className="col-md-12 mx-auto">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* required */}
                      <TextFieldGroup
                        placeholder="AssemblyNumber"
                        name="assembly_number"
                        value={otherCollectionProps.assembly_number}
                        onChange={onChange}
                        error={errors.assembly_number}
                        id="assembly_number"
                        labelText="Assembly Number"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      {/* not required */}
                      <SelectListGroup
                        placeholder="Binding Status"
                        name="binding_status"
                        value={otherCollectionProps.binding_status}
                        onChange={onChange}
                        error={errors.binding_status}
                        id="binding_status"
                        labelText="Binding Status"
                        formWidth="col-6"
                        options={optionsBinding}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* required */}
                      <TextFieldGroup
                        placeholder="Session Number"
                        name="session_number"
                        value={otherCollectionProps.session_number}
                        onChange={onChange}
                        error={errors.session_number}
                        id="session_number"
                        labelText="Session Number"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      {/* not required */}
                      <SingleDate
                        selected={otherCollectionProps.book_returned_date}
                        onChange={(date) =>
                          currentBookSetState({
                            ...currentBookState,
                            book_returned_date: date,
                          })
                        }
                        name="book_returned_date"
                        dateFormat="dd-MM-yyyy"
                        id="book_returned_date"
                        dateLabel="Book Returned Date"
                        //disabled={this.state.statusBookBinded ? false : true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* required */}
                      <TextFieldGroup
                        placeholder="Volume Number"
                        name="volume_number"
                        value={otherCollectionProps.volume_number}
                        onChange={onChange}
                        error={errors.volume_number}
                        id="volume_number"
                        labelText="Volume Number"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      {/* not required */}
                      <SingleDate
                        selected={otherCollectionProps.metadata_given_date}
                        onChange={(date) =>
                          currentBookSetState({
                            ...currentBookState,
                            metadata_given_date: date,
                          })
                        }
                        name="metadata_given_date"
                        dateFormat="dd-MM-yyyy"
                        id="metadata_given_date"
                        dateLabel="Metadata Given Date"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* required */}
                      <TextFieldGroup
                        placeholder="Part Number"
                        name="part_number"
                        value={otherCollectionProps.part_number}
                        onChange={onChange}
                        error={errors.part_number}
                        id="part_number"
                        labelText="Part Number"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      {/* not required */}
                      <SingleDate
                        selected={otherCollectionProps.metadata_start_date}
                        onChange={(date) =>
                          currentBookSetState({
                            ...currentBookState,
                            metadata_start_date: date,
                          })
                        }
                        name="metadata_start_date"
                        dateFormat="dd-MM-yyyy"
                        id="metadata_start_date"
                        dateLabel="Metadata Start Date"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <TextFieldGroup
                        placeholder="Number Of Pages"
                        name="numofpages"
                        value={otherCollectionProps.numofpages}
                        onChange={onChange}
                        error={errors.numofpages}
                        id="numofpages"
                        labelText="Number of Pages"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      <SingleDate
                        selected={otherCollectionProps.metadata_end_date}
                        onChange={(date) =>
                          currentBookSetState({
                            ...currentBookState,
                            metadata_end_date: date,
                          })
                        }
                        name="metadata_end_date"
                        dateFormat="dd-MM-yyyy"
                        id="metadata_end_date"
                        dateLabel="Metadata End Date"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <SelectListGroup
                        placeholder="PlaceOfSession"
                        name="place_session"
                        value={otherCollectionProps.place_session}
                        onChange={onChange}
                        error={errors.place_session}
                        id="place_session"
                        labelText="Place Of Session"
                        formWidth="col-6"
                        options={optionsSession}
                      />
                    </div>

                    <div className="col-sm-6">
                      <MultiSelectDatePicker
                        placeholder="Select One or Multiple Dates"
                        name="dates_session"
                        value={otherCollectionProps.dates_session}
                        onChange={onChangeDate}
                        error={errors.dates_session}
                        id="dates_session"
                        labelText="Dates Of Session"
                        formWidth="col-md"
                        info="* Please Enter Dates seperated by , in dd-MM-yyyy "
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <TextFieldGroup
                        placeholder="Year Of Book"
                        name="year_book"
                        value={otherCollectionProps.year_book}
                        onChange={onChange}
                        error={errors.year_book}
                        id="year_book"
                        labelText="Year Of Book"
                        formWidth="col-4"
                      />
                    </div>
                    <div className="col-sm-6">
                      {/* TODO - FIle Upload */}
                      <FileUploadForm
                        labelText="Upload Book Images"
                        info="* Upload the Scanned Images in zip file with filename of Book ID"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <TextFieldGroup
                        placeholder="Remarks"
                        name="remarksBook"
                        value={otherCollectionProps.remarksBook}
                        onChange={onChange}
                        error={errors.remarksBook}
                        id="remarksBook"
                        labelText="Remarks"
                        formWidth="col-md"
                      />
                    </div>
                    <div className="col-sm-6">
                      <button
                        type="submit"
                        class="btn btn-block btn-outline-success"
                        onClick={(e) => onSubmit(e)}
                        style={{
                          width: "36%",
                          marginTop: "1.5rem",
                          display: "none",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className={
                  CUSTOMER === "KLA"
                    ? "btn btn-block btn-outline-success"
                    : "btn btn-block btn-outline-danger"
                }
                data-dismiss="modal"
                style={{
                  width: "36%",
                  marginTop: "1.5rem",
                }}
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </div>
            {/* End Form here */}
          </div>
          {/* /.modal-content */}
        </form>
      </div>
      {/* /.modal-dialog */}
    </div>
  );
};

AddBook.propTypes = {
  currentBookState: PropTypes.object.isRequired,
  currentBookSetState: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddBook;
