import React, { useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Import Constants
import { getStatusBadge, getBindedBadge } from "../../constants/index";

// Import Book Context

import BookContext from "../../context/book/bookContext";

const TableDashboardItems = ({ bookItem, deleteItem, reIndexBook }) => {
  //console.log(
  //  `[DEBUG-DASHBOARD-TABLE ITEM] the binding status ${JSON.stringify(
  //    bookItem
  //  )}`
  //  );
  const {
    bookId,
    assemblyNumber,
    sessionNumber,
    pageCount,
    sectionCount,
    status,
    bindingStatus,
  } = bookItem;

  console.log(
    `[DEBUG-DASHBOARD-TABLE ITEM] the binding status ${bindingStatus}`
  );

  const onDelete = () => {
    // TODO Confirm the User You want to delete the item or nor
    deleteItem(bookId);

    // TODO After Delete set alerts for success & failure of deletion
  };

  const reIndex = () => {
    reIndexBook(bookId);
  };

  return (
    <Fragment>
      <tr>
        <td>{bookId}</td>
        <td>{assemblyNumber}</td>
        <td>{sessionNumber}</td>
        <td>{pageCount}</td>
        <td>{sectionCount}</td>
        <td>{getStatusBadge(status)}</td>
        <td>{getBindedBadge(bindingStatus)}</td>
        <td>
          <Link to={`/bookindex/${bookId}`}>Edit</Link>{" "}
          <a onClick={onDelete} href="#">
            Delete
          </a>{" "}
          <a href="#" onClick={reIndex}>
            Re-Index
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

TableDashboardItems.propTypes = {
  bookItem: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  reIndexBook: PropTypes.func.isRequired,
};

export default TableDashboardItems;
