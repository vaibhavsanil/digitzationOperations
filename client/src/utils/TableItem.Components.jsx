import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Import Book Context

const TableItems = ({ tableItem, editItem }) => {
  const { name_eng, name_kan, status, _id } = tableItem;

  const getStatusBadge = (status) => {
    if (status) {
      return <span className="badge badge-success">Live</span>;
    } else {
      return <span className="badge badge-danger">Not Live</span>;
    }
  };

  return (
    <Fragment>
      <tr id={_id}>
        <td>{name_eng}</td>
        <td>{name_kan}</td>
        <td>{getStatusBadge(status)}</td>
        <td>
          <a
            href="#"
            onClick={editItem}
            data-toggle="modal"
            data-target="#addSpeaker-modal-metadata"
          >
            Edit
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

TableItems.propTypes = {
  tableItems: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default TableItems;
