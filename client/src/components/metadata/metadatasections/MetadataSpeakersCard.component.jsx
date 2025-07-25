import React, { Fragment, useContext, useEffect, useState } from "react";
import swal from "sweetalert";

import PropTypes from "prop-types";

import TableSectionSpeakers from "../../../utils/SearchTable.component";
import { SearchTableNew } from "../../../utils/SearchTableNew.component";
import AddMetadataItemModal from "../../../utils/metadataModals/MetadataSectionModal.component";

//Imported Add Speaker Functions
import { modalplaceholderLabelValue } from "../../../utils/metadataModals/metadataModalsUtils";

//import AddItemModal from "../../../utils/metadataModals/MetadataSectionModal.component";

//Import the Context
import MetadataContext from "../../../context/metadata/metadataContext";

import { DELETE_SPEAKER, SPEAKER_ERROR } from "../../../context/types";

import {
  TABLE_HEADER_SPEAKER,
  CUSTOMER,
  ADD_EDIT_SPEAKER_TITLE_MODAL,
  ADD_EDIT_CHAIRMAN_TITLE_MODAL,
} from "../../../constants/index";

const MetadataSectionCardSpeaker = () => {
  const metadataContext = useContext(MetadataContext);
  const {
    currentMetadataItem,
    errors,
    getSpeakerItems,
    speakersItems,
    addSpeaker,
    editItem,
    deleteItem,
    setCurrentItemToNull,
  } = metadataContext;

  // const [speaker, setSpeaker] = useState({
  //   name_eng: "",
  //   name_kan: "",
  //   status: null,
  //   id: null,
  //   lastModifiedAt: "",
  //   lastModifiedBy: "  ",
  // });

  useEffect(() => {}, [errors, speakersItems]);
  const [currentItem, setCurrentItem] = useState({
    name_eng: "",
    name_kan: "",
    status: null,
    _id: null,
    last_modified_time: null,
    modified_user: null,
  });

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  const editItemfunc = (e, _id) => {
    // console.log("In Edit Item for : ", _id);
    editItem(_id, "speaker", "speakerName");
  };

  const onChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const getStatusBadge = (status) => {
    if (status) {
      return <span className="badge badge-success">Live</span>;
    } else {
      return <span className="badge badge-danger">Not Live</span>;
    }
  };

  const getTableItems = (_id) => {
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={(e) => editItemfunc(e, _id)}
        data-toggle="modal"
        data-target="#addSpeaker-modal-metadata"
      >
        Edit
      </button>
    );
  };

  const initSpeakerState = () => {
    // Intializing the Speaker State to Null
    setCurrentItem({
      name_eng: "",
      name_kan: "",
      status: null,
      _id: null,
      last_modified_time: null,
      modified_user: null,
    });
    setLoading({ buttonLoading: false });
  };

  const AddSpeaker = () => {
    if (currentMetadataItem) {
      setLoading({ buttonLoading: true });
      const currentItemInstance = currentItem;
      delete currentItem["last_modified_time"];
      delete currentItem["modified_user"];

      addSpeaker(currentItemInstance).then((responseMsg) => {
        if (typeof responseMsg === "string") {
          initSpeakerState();
          swal("Good job!", responseMsg, "success");
        } else {
          initSpeakerState();
          swal("Awww Snap !!!", responseMsg.response.data.speakerName, "error");
        }
      });
    } else {
      //Call the Add Speaker Action

      setLoading({ buttonLoading: true });
      const currentItemInstance = currentItem;
      delete currentItem["last_modified_time"];
      delete currentItem["modified_user"];
      delete currentItem["_id"];

      addSpeaker(currentItemInstance).then((responseMsg) => {
        if (typeof responseMsg === "string") {
          initSpeakerState();
          swal("Good job!", responseMsg, "success");
        } else {
          initSpeakerState();
          swal("Awww Snap !!!", responseMsg.response.data.speakerName, "error");
        }
      });
    }
  };

  const modalplaceholdervalue = modalplaceholderLabelValue("speaker");

  const COLUMNS = [
    {
      Header: "Speakers Name (English)",
      Footer: "Speakers Name (English)",
      accessor: "name_eng",
      sticky: "left",
    },

    {
      Header: "Speaker's Name (Kannada)",
      Footer: "Speaker's Name (Kannada)",
      accessor: "name_kan",
      sticky: "left",
    },
    {
      Header: "Status",
      Footer: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return getStatusBadge(value);
      },
    },
    {
      Header: "Actions",
      Footer: "Actions",
      accessor: "_id",
      Cell: ({ value }) => {
        return getTableItems(value);
      },
    },
  ];

  const DeleteSpeaker = () => {
    const _id = currentMetadataItem._id;
    swal({
      title: `Are you sure you want to delete ${currentMetadataItem.name_eng} ?`,
      text: "Once deleted, you will not be able to recover this field!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await deleteItem(
            _id,
            "speaker",
            DELETE_SPEAKER,
            SPEAKER_ERROR,
            "speakerName"
          );
          console.log("[DELETE-SPEAKER] response", JSON.stringify(res));

          if (res.msg === "success") {
            swal(`${currentMetadataItem.name_eng}  has been deleted !!!`, {
              icon: "success",
            });
          } else {
            swal(
              `Poof! ${currentMetadataItem.name_eng} cannot be deleted .Contact System Administrator   `,
              {
                icon: "error",
              }
            );
          }
        } catch (err) {}
      } else {
        swal(` ${currentMetadataItem.name_eng}  is safe!`);
      }
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div
            className={
              CUSTOMER === "KLA"
                ? "card card-outline card-success"
                : "card card-outline card-danger"
            }
          >
            <div className="card-header" style={{ backgroundColor: "white" }}>
              <h3 className="card-title">
                {CUSTOMER === "KLA" ? "SPEAKER" : "CHAIRMAN"}
              </h3>
              <div className="card-tools">
                <button
                  className={
                    CUSTOMER === "KLA"
                      ? "btn btn-outline-success mr-2"
                      : "btn btn-outline-danger mr-2"
                  }
                  data-toggle="modal"
                  data-target="#addSpeaker-modal-metadata"
                  onClick={() => setCurrentItemToNull()}
                >
                  {CUSTOMER === "KLA" ? "Add Speaker" : "Add Chairman"}
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="maximize"
                >
                  <i className="fas fa-expand"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
              {/* /.card-tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <SearchTableNew
                tableHeaderName={
                  CUSTOMER === "KLA"
                    ? "DATATABLE OF ADDED SPEAKER'S"
                    : "DATATABLE OF ADDED CHAIRMAN'S"
                }
                CUSTOMER={CUSTOMER}
                columns_table={COLUMNS}
                loading={loading}
                table_data={speakersItems}
                MetadataType="Speaker"
              />

              {/* <TableSectionSpeakers
                tableHeaderName="DATATABLE OF ADDED SPEAKERS"
                customer={CUSTOMER}
                tableHeader={TABLE_HEADER_SPEAKER}
                loading={loading}
              /> */}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        <div className="col-md-1"></div>
      </div>
      {/* <AddItemModal
        modalTitle={
          CUSTOMER === "KLA"
            ? ADD_EDIT_SPEAKER_TITLE_MODAL
            : ADD_EDIT_CHAIRMAN_TITLE_MODAL
        }
      /> */}
      <AddMetadataItemModal
        modalTitle={
          CUSTOMER === "KLA"
            ? ADD_EDIT_SPEAKER_TITLE_MODAL
            : ADD_EDIT_CHAIRMAN_TITLE_MODAL
        }
        onChange={onChange}
        //speaker={speaker}
        currentItem={currentItem}
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setCurrentItem}
        setLoading={setLoading}
        AddSpeaker={AddSpeaker}
        onDelete={DeleteSpeaker}
        attribute="speaker"
        labelValues={modalplaceholdervalue}
      />
    </Fragment>
  );
};

MetadataSectionCardSpeaker.propTypes = {};

export default MetadataSectionCardSpeaker;
