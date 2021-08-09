import React, { useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import FileUploadForm from "../common/FileUpload.component";
// import MultiSelectDate from "../common/MultiSelectDatePicker";
import MultiSelectDatePicker from "../common/MultiSelectDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SingleDate from "../common/SingleDate-component";

// Import Context
import BookContext from "../../context/book/bookContext";

import {
  bookStateObject,
  modalHeaderBackColour,
  styleDashBoardCard,
  CUSTOMER,
  getStatusBookSummaryTop,
  changeDateToString,
} from "../../constants/index";

export const BookSummary = ({ id }) => {
  const bookContext = useContext(BookContext);
  let history = useHistory();
  const {
    errors,
    getCurrentBook,
    currentBookStructure,
    addBookStruct,
    getAnnexureItems,
  } = bookContext;

  const [bookState, setBookState] = useState(bookStateObject);
  const [buttonloading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      getCurrentBook(id);
      // .then((currentBook) => {
      //   if (typeof currentBook === "object") {
      //     console.log(
      //       "[DEBUG -BookSummaryTop-ERROR] the current Book Structure",
      //       currentBook
      //     );
      //   } else {
      //     getAnnexureItems(currentBookStructure.bookId);
      //   }
      // });
      const modified_time_state = changeDateToString(currentBookStructure, [
        "book_returned_date",
        "metadata_end_date",
        "metadata_given_date",
        "metadata_start_date",
      ]);
      // console.info(
      //   "[DEBUG the book state is ERROR modified_time_state] ",
      //   modified_time_state
      // );
      setBookState(modified_time_state);

      // console.info("[DEBUG the book state is error] ", bookState);
    } else {
      swal("Oops", "The Book Cannot Be Fetched  !!!", "error");
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    }
    // if (errors.length !== 0) {
    //   swal("Oops", "The Book Cannot Be Fetched !!!", "error");
    //   // setTimeout(() => {
    //   //   history.push("/dashboard");
    //   // }, 1000);
    // }
  }, [errors]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      // getCurrentBook(id)
      const modified_time_state = changeDateToString(currentBookStructure, [
        "book_returned_date",
        "metadata_end_date",
        "metadata_given_date",
        "metadata_start_date",
      ]);
      console.info(
        "[DEBUG the book state the value of modified_time] ",
        modified_time_state
      );

      if (
        Object.keys(modified_time_state).length > 0 &&
        modified_time_state.constructor === Object
      ) {
        setBookState(currentBookStructure);
        console.info(
          "[DEBUG the book state is current Book structure] ",
          bookState
        );
      }

      console.info(
        "[DEBUG the book state is current Book structure] ",
        bookState
      );
    } else {
      swal("Oops", "The Book Cannot Be Fetched from the state !!!", "error");
      // setTimeout(() => {
      //   history.push("/dashboard");
      // }, 1000);
    }
    // if (errors.length !== 0) {
    //   swal("Oops", "The Book Cannot Be Fetched !!!", "error");
    //   // setTimeout(() => {
    //   //   history.push("/dashboard");
    //   // }, 1000);
    // }
  }, [currentBookStructure]);

  const onChange = (e) => {
    //console.log(e.target);

    setBookState({ ...bookState, [e.target.name]: e.target.value });
  };

  // const onChangeDate = (date) => {
  //   this.setState({
  //     bookReturnedDate: date,
  //   });
  // };

  const onChangeDate = (e) => {
    let dateVar = e.target.value;
    let dateVarRes = dateVar.split(",");

    //console.info("[DEBUG] change date in ADD Book Action", dateVarRes);

    setBookState({
      ...bookState,
      dates_session: dateVarRes,
    });
  };

  const optionsSession = [
    { label: "* Select Place Of Session", value: 0 },
    { label: "Bangalore", value: "bangalore" },
    { label: "Belegavi", value: "belegavi" },
  ];
  const optionsBinding = [
    { label: "--Binding Status--", value: false },
    { label: "UN-BINDED", value: false },
    { label: "BINDED", value: true },
  ];

  const onSubmit = (e) => {
    //Call the Submit Action
    addBookStruct(bookState).then((responseMsg) => {
      if (responseMsg === "success") {
        // initMetadataState();
        // clearcurrentMetadataSection();
        getCurrentBook(id);
        const modified_time_state = changeDateToString(currentBookStructure, [
          "book_returned_date",
          "metadata_end_date",
          "metadata_given_date",
          "metadata_start_date",
        ]);

        setBookState(modified_time_state);
        swal(
          "Good job!",
          "The Book Structural Metadata edited Successfully!!!",
          "success"
        );
      } else {
        // initMetadataState();
        swal(
          "Awww Snap !!!",
          "Book Section not edited successfully !!! Please Try Again ",
          "error"
        );
      }
    });
    // // Call the success
    // console.log(res);
  };

  return (
    <div className="card" style={styleDashBoardCard}>
      {/* Card Header Start */}
      <div className="card-header" style={modalHeaderBackColour(CUSTOMER)}>
        <div className="card-tools"></div>
        <h3 className="card-title">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
            data-toggle="tooltip"
            title="Collapse"
          >
            <i className="fas fa-minus" />
          </button>{" "}
          <b> Book Summary</b>{" "}
        </h3>
      </div>
      {/* Card Header End */}
      {/* Card Body Start */}
      {/* Form Element Should Start Here */}

      <div className="card-body">
        {/* Book Summary Introduction Row */}
        <div className="row">
          <div class="col-sm">
            <h4 style={{ marginLeft: "0 25px" }}>
              Book ID: <span className="bookId-number">{bookState.bookId}</span>{" "}
            </h4>
          </div>
          <div class="col-sm">
            <button
              type="button"
              style={{
                width: "123px",
                margin: "0 auto",
              }}
              disabled="true"
              className={getStatusBookSummaryTop(
                currentBookStructure.status_of_books
              )}
            >
              {" "}
              {bookState.status_of_books}
            </button>
          </div>
        </div>

        <div class="row">
          <div className="col-md-10 mx-auto">
            <div className="row">
              <div className="col-sm-6">
                {CUSTOMER === "KLA" ? (
                  <TextFieldGroup
                    placeholder="AssemblyNumber"
                    name="assembly_number"
                    value={bookState.assembly_number}
                    onChange={onChange}
                    error={errors.assembly_number}
                    id="assembly_number"
                    labelText="Assembly Number"
                    formWidth="col-4"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-6">
                <SelectListGroup
                  placeholder="Binding Status"
                  name="binding_status"
                  value={bookState.binding_status}
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
                <TextFieldGroup
                  placeholder="Session Number"
                  name="session_number"
                  value={bookState.session_number}
                  onChange={onChange}
                  error={errors.session_number}
                  id="session_number"
                  labelText="Session Number"
                  formWidth="col-4"
                />
              </div>
              <div className="col-sm-6">
                <SingleDate
                  selected={bookState.book_returned_date}
                  onChange={(date) =>
                    setBookState({
                      ...bookState,
                      book_returned_date: date,
                    })
                  }
                  name="book_returned_date"
                  dateFormat="dd-MM-yyyy"
                  id="book_returned_date"
                  dateLabel="Book Returned Date"
                  //disabled={bookState.statusBookBinded ? false : true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <TextFieldGroup
                  placeholder="Volume Number"
                  name="volume_number"
                  value={bookState.volume_number}
                  onChange={onChange}
                  error={errors.volume_number}
                  id="volume_number"
                  labelText="Volume Number"
                  formWidth="col-4"
                />
              </div>
              <div className="col-sm-6">
                <SingleDate
                  selected={bookState.metadata_given_date}
                  onChange={(date) =>
                    setBookState({
                      ...bookState,
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
                <TextFieldGroup
                  placeholder="Part Number"
                  name="part_number"
                  value={bookState.part_number}
                  onChange={onChange}
                  error={errors.part_number}
                  id="part_number"
                  labelText="Part Number"
                  formWidth="col-4"
                />
              </div>
              <div className="col-sm-6">
                <SingleDate
                  selected={bookState.metadata_start_date}
                  onChange={(date) =>
                    setBookState({
                      ...bookState,
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
                  value={bookState.numofpages}
                  onChange={onChange}
                  error={errors.numofpages}
                  id="numofpages"
                  labelText="Number of Pages"
                  formWidth="col-4"
                />
              </div>
              <div className="col-sm-6">
                <SingleDate
                  selected={bookState.metadata_end_date}
                  onChange={(date) =>
                    setBookState({
                      ...bookState,
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
                  value={bookState.place_session}
                  onChange={onChange}
                  error={errors.place_session}
                  id="place_session"
                  labelText="Place Of Session"
                  formWidth="col-4"
                  options={optionsSession}
                />
              </div>
              <div className="col-sm-6">
                <MultiSelectDatePicker
                  placeholder="Select One or Multiple Dates"
                  name="dates_session"
                  value={bookState.dates_session}
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
                  value={bookState.year_book}
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
                  value={bookState.remarksBook}
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
                  style={{
                    width: "36%",
                    marginTop: "1.7rem",
                  }}
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card Body End */}
      {/* /.card-body */}
      <div className="card-footer">{/* Empty Footer */}</div>

      {/* Form element Should End Here */}
      {/* /.card-footer*/}
    </div>
  );
};

// class BookSummary extends Component {
//   constructor() {
//     super();
//     bookState = {
//       department: "KLA",
//       bookId: 54,
//       assemblyNumber: 1,
//       sessionNumber: 3,
//       volumeNumber: 4,
//       partNumber: 5,
//       numberPages: 1123,
//       placeSession: "",

//       yearBook: 2013,
//       datesSession: ["12-03-2012", "13-03-2012"],

//       statusBookBinded: "UNBINDED",
//       bookReturnedDate: null,
//       metadataGivenDate: null,
//       metadataStartDate: null,
//       metadataEndDate: null,
//       remarksBook: "",
//       metadataStatus: "INCOMPLETE",
//       bookStatus: "INDEXED",
//       uploadfilePath: "",

//       loading: false,

//       errors: {},
//     };
//   }

//   onChange = (e) => {
//     //console.log(e.target);

//     setState({ [e.target.name]: e.target.value });
//   };

//   onChangeDate = (date) => {
//     this.setState({
//       bookReturnedDate: date,
//     });
//   };

//   render() {
//     const { errors } = this.state;

//     //const { onChangeDate, onChange } = this.state;

//     // Select options for status
//     const optionsSession = [
//       { label: "* Select Place Of Session", value: 0 },
//       { label: "Bangalore", value: "Bangalore" },
//       { label: "Belegavi", value: "Belegavi" },
//     ];
//     const optionsBinding = [
//       { label: "--Binding Status--", value: false },
//       { label: "UN-BINDED", value: false },
//       { label: "BINDED", value: true },
//     ];

//     // Dummy Data

//     return (
//       <div className="card">
//         {/* Card Header Start */}
//         <div className="card-header">
//           <div className="card-tools"></div>
//           <h3 className="card-title">
//             <button
//               type="button"
//               className="btn btn-tool"
//               data-card-widget="collapse"
//               data-toggle="tooltip"
//               title="Collapse"
//             >
//               <i className="fas fa-minus" />
//             </button>{" "}
//             <b> Book Summary</b>{" "}
//           </h3>
//         </div>
//         {/* Card Header End */}
//         {/* Card Body Start */}
//         {/* Form Element Should Start Here */}

//         <div className="card-body">
//           {/* Book Summary Introduction Row */}
//           <div className="row">
//             <div class="col-sm">
//               <h4 style={{ marginLeft: "0 25px" }}>
//                 Book ID: <span className="bookId-number">54</span>{" "}
//               </h4>
//             </div>
//             <div class="col-sm">
//               <button
//                 type="button"
//                 class="btn btn-block bg-gradient-success btn-sm status__button "
//               >
//                 {" "}
//                 Book Indexed
//               </button>
//             </div>
//           </div>
//           <form onSubmit={this.onSubmit}>
//             <div class="row">
//               <div className="col-md-10 mx-auto">
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="AssemblyNumber"
//                       name="assemblyNumber"
//                       value={this.state.assmeblyNumber}
//                       onChange={this.onChange}
//                       error={errors.assemblyNumber}
//                       id="assemblyNumber"
//                       labelText="Assembly Number"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <SelectListGroup
//                       placeholder="Binding Status"
//                       name="statusBookBinded"
//                       value={this.state.statusBookBinded}
//                       onChange={this.onChange}
//                       error={errors.statusBookBinded}
//                       id="statusBookBinded"
//                       labelText="Binding Status"
//                       formWidth="col-6"
//                       options={optionsBinding}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Session Number"
//                       name="sessionNumber"
//                       value={this.state.sessionNumber}
//                       onChange={this.onChange}
//                       error={errors.sessionNumber}
//                       id="sessionNumber"
//                       labelText="Session Number"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <SingleDate
//                       selected={this.state.bookReturnedDate}
//                       onChange={() => this.onChangeDate}
//                       name="bookReturnedDate"
//                       dateFormat="dd-MM-yyyy"
//                       id="bookReturnedDate"
//                       dateLabel="Book Returned Date"
//                       //disabled={this.state.statusBookBinded ? false : true}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Volume Number"
//                       name="volumeNumber"
//                       value={this.state.volumeNumber}
//                       onChange={this.onChange}
//                       error={errors.volumeNumber}
//                       id="volumeNumber"
//                       labelText="Volume Number"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <SingleDate
//                       selected={this.state.metadataGivenDate}
//                       onChange={this.onChangeDate}
//                       name="metadataGivenDate"
//                       dateFormat="dd-MM-yyyy"
//                       id="metadataGivenDate"
//                       dateLabel="Metadata Given Date"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Part Number"
//                       name="partNumber"
//                       value={this.state.partNumber}
//                       onChange={this.onChange}
//                       error={errors.partNumber}
//                       id="partNumber"
//                       labelText="Part Number"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <SingleDate
//                       selected={this.state.metadataStartDate}
//                       onChange={this.onChangeDate}
//                       name="metadataStartDate"
//                       dateFormat="dd-MM-yyyy"
//                       id="metadataStartDate"
//                       dateLabel="Metadata Start Date"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Number Of Pages"
//                       name="numPages"
//                       value={this.state.numberPages}
//                       onChange={this.onChange}
//                       error={errors.numberPages}
//                       id="numPages"
//                       labelText="Number of Pages"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <SingleDate
//                       selected={this.state.metadataEndDate}
//                       onChange={this.onChangeDate}
//                       name="metadataEndDate"
//                       dateFormat="dd-MM-yyyy"
//                       id="metadataEndDate"
//                       dateLabel="Metadata End Date"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <SelectListGroup
//                       placeholder="PlaceOfSession"
//                       name="placeSession"
//                       value={this.state.placeofSession}
//                       onChange={this.onChange}
//                       error={errors.placeofSession}
//                       id="placeofSession"
//                       labelText="Place Of Session"
//                       formWidth="col-4"
//                       options={optionsSession}
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <MultiSelectDatePicker
//                       placeholder="Select One or Multiple Dates"
//                       name="datesSession"
//                       value={this.state.datesSession}
//                       onChange={this.onChange}
//                       error={errors.datesSession}
//                       id="datesSession"
//                       labelText="Dates Of Session"
//                       formWidth="col-md"
//                       info="* Please Enter Dates seperated by , in dd-MM-yyyy "
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Year Of Book"
//                       name="yearBook"
//                       value={this.state.yearBook}
//                       onChange={this.onChange}
//                       error={errors.yearBook}
//                       id="yearBook"
//                       labelText="Year Of Book"
//                       formWidth="col-4"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     {/* TODO - FIle Upload */}
//                     <FileUploadForm
//                       labelText="Upload Book Images"
//                       info="* Upload the Scanned Images in zip file with filename of Book ID"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <TextFieldGroup
//                       placeholder="Remarks"
//                       name="remarksBook"
//                       value={this.state.remarksBook}
//                       onChange={this.onChange}
//                       error={errors.remarksBook}
//                       id="remarksBook"
//                       labelText="Remarks"
//                       formWidth="col-md"
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <button
//                       type="submit"
//                       class="btn btn-block btn-outline-success"
//                       style={{
//                         width: "36%",
//                         marginTop: "1.5rem",
//                       }}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//         {/* Card Body End */}
//         {/* /.card-body */}
//         <div className="card-footer">{/* Empty Footer */}</div>

//         {/* Form element Should End Here */}
//         {/* /.card-footer*/}
//       </div>
//     );
//   }
//}

BookSummary.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BookSummary;
