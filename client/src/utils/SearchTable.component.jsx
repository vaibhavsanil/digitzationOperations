import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

import TableItems from './TableItem.Components';

import AddItemModal from './metadataModals/MetadataSectionModal.component';
import MetadataContext from '../context/metadata/metadataContext';

import {
  ADD_EDIT_SPEAKER_TITLE_MODAL,
  ADD_EDIT_CHAIRMAN_TITLE_MODAL,
  CUSTOMER,
} from '../constants/index';

const SearchTable = ({
  tableHeaderName,
  customer,
  tableHeader,

  loadingTable,
  deleteItem,
  editItem,
}) => {
  // const removeTableElements = (className) => {
  //   let elements = document.getElementsByClassName(className);
  //   console.log("Remove elements", elements);
  //   while (elements.length > 0) {
  //     elements[0].parentNode.removeChild(elements[0]);
  //   }
  // };

  const metadataContext = useContext(MetadataContext);

  const {
    editSpeakerItem,
    currentSpeaker,
    addSpeaker,
    errors,
    clearErrors,
    getSpeakerItems,
    speakersItems,
  } = metadataContext;

  const renderTableHeaders = (headersArray) => {
    return headersArray.map((header, i) => <th key={i}>{header}</th>);
  };

  const [speaker, setSpeaker] = useState({
    name_eng: '',
    name_kan: '',
    status: null,
    id: null,
    lastModifiedAt: '',
    lastModifiedBy: '  ',
  });

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  const { isModalOpen, buttonLoading } = loading;

  // Initialize the Speaker State to null
  const initSpeakerState = () => {
    // Intializing the Spekaer State to Null
    setSpeaker({
      name_eng: '',
      name_kan: '',
      status: null,
      id: null,
      lastModifiedAt: '',
      lastModifiedBy: '',
    });
    setLoading({ buttonLoading: false });
  };

  const onChange = (e) => {
    setSpeaker({ ...speaker, [e.target.name]: e.target.value });
  };

  const tableDisplay = (speakersItems) => {
    if (speakersItems !== null && speakersItems.length === 0 && !loading) {
      return (
        <tr>
          <td valign="top" colSpan="4">
            <h6>There is no element in the Table </h6>
          </td>
        </tr>
      );
    } else {
      return speakersItems.map((speakerItem) => (
        <TableItems tableItem={speakerItem} />
      ));
    }
  };

  const tableItemsSpeaker = tableDisplay(speakersItems);

  const AddSpeaker = () => {
    // Set the Button to Loading or Editing

    if (currentSpeaker) {
      setLoading({ buttonLoading: true });
      const speakerInstance = speaker;
      delete speakerInstance['lastModifiedAt'];
      delete speakerInstance['lastModifiedBy'];
      const successMsg = addSpeaker(speakerInstance);

      if (successMsg) {
        setLoading({ buttonLoading: false });
        swal('Good job!', successMsg, 'success');
      }

      if (errors.speakerName) {
        setLoading({ buttonLoading: false });
        swal('Awww Snap !!!', errors.speakerName, 'error');
      }
    } else {
      //Call the Add Speaker Action
      setLoading({ buttonLoading: true });
      const speakerInstance = speaker;
      delete speakerInstance['lastModifiedAt'];
      delete speakerInstance['lastModifiedBy'];
      delete speakerInstance['id'];

      addSpeaker(speakerInstance).then((responseMsg) => {
        if (typeof responseMsg === 'string') {
          initSpeakerState();
          swal('Good job!', responseMsg, 'success');
        } else {
          initSpeakerState();
          swal('Awww Snap !!!', responseMsg.response.data.speakerName, 'error');
        }
      });
    }
  };

  return (
    <div className="col-12">
      <section className="action-tables">
        <div className="row">
          <div className="col-12">
            {/* Table Searchable Start with Filter */}
            <div className="card">
              <div className="card-header">
                <h3
                  className="card-title"
                  style={{
                    marginTop: '6px',
                  }}
                >
                  <b> {tableHeaderName} </b>{' '}
                </h3>
                {/* TODO- Conditional Rendering of Buttons for RED Clolour for KLC as per the passed props */}
                <button
                  type="button"
                  className={
                    'btn ' + (customer === 'KLA' ? 'btn-success' : 'btn-danger')
                  }
                  data-toggle="modal"
                  data-target="#addSpeaker-modal-metadata"
                  style={{
                    float: 'right',
                    width: '158px',
                    display: 'none',
                  }}
                >
                  Add Book
                </button>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped table-head-fixed text-center"
                >
                  <thead>
                    <tr>{renderTableHeaders(tableHeader)}</tr>
                  </thead>
                  <tbody>
                    {tableItemsSpeaker}
                    {/* {speakersItems !== null &&
                    speakersItems.length === 0 &&
                    !loading ? (
                      <tr>
                        <td valign="top" colSpan="4">
                          <h6>There is no element in the Table </h6>
                        </td>
                      </tr>
                    ) : (
                      speakersItems.map((speakerItem) => (
                        <TableItems
                          tableItem={speakerItem}
                          editItems={editSpeakerItem}
                        />
                      ))
                    )} */}
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
            {/* Table Searchable Start with Filter */}
          </div>
        </div>
        {/* Modal Open */}
        <AddItemModal
          modalTitle={
            CUSTOMER === 'KLA'
              ? ADD_EDIT_SPEAKER_TITLE_MODAL
              : ADD_EDIT_CHAIRMAN_TITLE_MODAL
          }
          onChange={onChange}
          speaker={speaker}
          loading={loading}
          setSpeaker={setSpeaker}
          setLoading={setLoading}
          AddSpeaker={AddSpeaker}
        />
      </section>
    </div>
  );
};

SearchTable.propTypes = {
  tableHeader: PropTypes.string.isRequired,
  tableHeaderName: PropTypes.string.isRequired,
  customer: PropTypes.string,
  //tableItems: PropTypes.array.isRequired,
};

export default SearchTable;
