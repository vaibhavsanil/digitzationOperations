import React, { Component, Fragment, useEffect, useContext } from "react";

import "./BookIndex.styles.scss";

import BookSummary from "./BookSummary-Top";
import BookTable from "./BookMetadataTable";
import AnnexureSummary from "./AnnexureSummary.component";
import BreadCrumbs from "../../utils/Breadcrumbs";

import SideNav from "../sideNav/SideNav";

// Import Book Context
import BookContext from "../../context/book/bookContext";

import {
  modalHeaderBackColour,
  styleDashBoardCard,
  CUSTOMER,
} from "../../constants/index";
import { useBlockLayout } from "react-table";

const BookIndex = (props) => {
  //let { id } = useParams();
  const { id } = props.match.params;
  const bookContext = useContext(BookContext);
  const {
    currentBookStructure,
    getCurrentBook,
    getAnnexureItems,
  } = bookContext;

  // useEffect(() => {
  //   getAnnexureItems();
  // }, []);

  return (
    <div className="content-wrapper">
      <BreadCrumbs />
      <BookSummary id={id} />
      <SideNav />
      <AnnexureSummary />
      <BookTable />
    </div>
  );
};

// class BookIndex extends Component {
//   constructor() {
//     super();
//     this.state = {
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

//   // onChange = (e) => {
//   //   //console.log(e.target);

//   //   this.setState({ [e.target.name]: e.target.value });
//   // };

//   // onChangeDate = (date) => {
//   //   this.setState({
//   //     bookReturnedDate: date,
//   //   });
//   // };
//   render() {
//     return (
//       <div className="content-wrapper">
//         <BreadCrumbs />
//         <BookSummary />
//         <SideNav />
//         <AnnexureSummary />
//         <BookTable />
//       </div>
//     );
//   }
// }

export default BookIndex;
