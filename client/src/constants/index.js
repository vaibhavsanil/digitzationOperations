import React from "react";

import { Link } from "react-router-dom";

// GLOBAL CONSTANTS
export const CUSTOMER = "KLC";

// Classes
export const CUSTOMER_NAME_COLOUR = "#46A049";
export const LOGIN_CLASS_BODY = "login-page";

export const MODAL_HEADER_KLA = "#46A049";

//Metadata Table Constants

export const TABLE_HEADER_SPEAKER = [
  "Name(English)",
  "Name(Kannada)",
  "Status",
  "Actions",
];

//Modal Metadata

export const ADD_EDIT_SPEAKER_TITLE_MODAL = "ADD/EDIT SPEAKER";

export const ADD_EDIT_CHAIRMAN_TITLE_MODAL = "ADD/EDIT CHAIRMAN";

// Dashboard table Items

export const getStatusBadge = (status) => {
  let classes = "badge ";
  if (status === "Book Created" || status === "CREATED") {
    classes += "badge-info";
  } else if (status === "Metadata Completed") {
    classes += "badge-warning";
  } else if (status === "OCR Process") {
    classes += "badge-primary";
  } else if (status === "Indexing") {
    classes += "badge-secondary";
  } else if (status === "Book Live") {
    classes += "badge-success";
  } else if (status === "Book Error") {
    classes += "badge-danger";
  }

  return <span className={classes}>{status}</span>;
};

export const getBindedBadge = (binding) => {
  let classes = "badge ";
  if (!binding) {
    classes += `badge-danger`;
  } else {
    classes += "badge-success";
  }
  return <span className={classes}>{binding ? "Binded" : "UnBinded"}</span>;
};

export const getTableActionItems = (bookid) => (
  <Link to={`/bookindex/${bookid}`} className="btn btn-link">
    Edit
  </Link>
);

/// Card Styling
export const styleDashBoardCard = {
  margin: "0 10px",
  marginBottom: "1rem",
};

export const modalHeaderBackColour = (customer) => {
  const backgroundcolor = customer === "KLA" ? "#c5e1a5" : "#DD3D45";
  return {
    backgroundColor: backgroundcolor,
  };
};

// Book State Object

export const bookStateObject = {
  department: null,
  bookId: null, //
  assembly_number: null, //
  session_number: null, //
  volume_number: null, //
  part_number: null, //
  numofpages: null, //
  place_session: null, //

  year_book: null, //
  dates_session: [], //

  binding_status: null, //
  book_returned_date: new Date(), //
  metadata_given_date: new Date(), //
  metadata_start_date: new Date(), //
  metadata_end_date: new Date(), //
  remarksBook: null, //
  status_metadata_book: null, //
  status_of_books: null, //
  uploadfilePath: null,

  // loading: false,

  //errors: {},
};

//Setting the Add Sectional Metadata State
export const metadataStateObject = {
  _id: null,
  struct_id: null,
  book_id: null,
  section_type: null,
  start_page: null,
  end_page: null,
  debate_title_subject: "",
  debate_subject_eng: "",
  debate_subject_kan: "",
  issues_section: [],
  tags_array: [],
  debate_section_date: "",
  question_number: null,
  questioner_name: "",
  minister_name: null,
  minister_portfolio: null,
  annexure: null,
  status: null,

  debate_participants: [],
  path_pdf: null,
  modified_user: null,
  last_modified_time: null,
};

export const metadataStateObjectPart1 = {
  _id: null,
  struct_id: null,
  book_id: null,
  section_type: "part1",
  start_page: null,
  end_page: null,
  debate_title_subject: "",
  debate_subject_eng: "",
  debate_subject_kan: "",
  issues_section: [],
  tags_array: [],
  debate_section_date: "",
  question_number: null,
  questioner_name: "",
  ministers_name: null,
  minister_portfolio: null,
  annexure: null,
  status: null,

  debate_paticipants: [],
  path_pdf: null,
  modified_user: null,
  last_modified_time: null,
};

export const metadataStateObjectPart2 = {
  _id: null,
  struct_id: null,
  book_id: null,
  section_type: "part2",
  start_page: null,
  end_page: null,
  debate_title_subject: "",
  debate_subject_eng: "",
  debate_subject_kan: "",
  issues_section: [],
  tags_array: [],
  debate_section_date: "",
  question_number: null,
  questioner_name: "",
  ministers_name: null,
  minister_portfolio: null,
  annexure: null,
  status: null,

  debate_participants: [],
  path_pdf: null,
  modified_user: null,
  last_modified_time: null,
};

export const getStatusBookSummaryTop = (status) => {
  let classes = "btn btn-block btn-sm ";
  if (status === "Book Created" || status === "CREATED") {
    classes += "bg-gradient-info";
  } else if (status === "Metadata Completed") {
    classes += "bg-gradient-warning";
  } else if (status === "OCR Process") {
    classes += "bg-gradient-primary";
  } else if (status === "Indexing") {
    classes += "bg-gradient-secondary";
  } else if (status === "Book Live") {
    classes += "bg-gradient-success";
  } else if (status === "Book Error") {
    classes += "bg-gradient-danger";
  }

  return classes;
};
//
export const setInputfieldToNull = (id_array) => {
  //  This method set the form input to null
  // https://stackoverflow.com/questions/7609130/set-the-value-of-an-input-field
  console.info("[DEBUG] inputfield", id_array);
  id_array.map((id) => {
    document.getElementById(id).setAttribute("value", "");
  });
};

// get unique elements in the array of objects
function unique_element(arr) {
  const seen = new Set();
  // const arr = [
  //   { id: 1, name: "test1" },
  //   { id: 2, name: "test2" },
  //   { id: 2, name: "test3" },
  //   { id: 3, name: "test4" },
  //   { id: 4, name: "test5" },
  //   { id: 5, name: "test6" },
  //   { id: 5, name: "test7" },
  //   { id: 6, name: "test8" },
  // ];

  const result = arr.filter((el) => {
    const duplicate = seen.has(el.value);
    seen.add(el.value);
    return !duplicate;
  });
  return result;
}

// Function for Book Summary Top to filter the Date Value to ISO String to String
// [book_returned_date,metadata_end_date,metadata_given_date,metadata_start_date]
export function changeDateToString(stateObject, dateArray) {
  let instanceDateObject = stateObject;

  dateArray.map((date) => {
    if (
      !(
        instanceDateObject[date] === null ||
        instanceDateObject[date] === undefined
      )
    ) {
      const newDate = new Date(instanceDateObject[date]);
      // console.info("[DEBUG] Book Summary Top newDate ", newDate);
      //let newDateString = newDate.toString();
      instanceDateObject[date] = newDate;
    }
  });
  //console.info("[DEBUG] Book Summary Top ", instanceDateObject);
  return instanceDateObject;
}

// Function to remove the old classes from the body

export function removeclassbody(classname) {
  if (document.body.classList.contains(classname)) {
    document.body.className = document.body.className.replace(classname, "");
  }
}
export function addclassbody(classname) {
  if (!document.body.classList.contains(classname)) {
    document.body.className = document.body.className.replace(
      "",
      "sidebar-mini "
    );
  }
}
