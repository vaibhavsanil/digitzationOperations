import React, { Fragment, useContext, useState, useEffect } from "react";
import swal from "sweetalert";

import { SearchTableNew } from "../../../utils/SearchTableNew.component";
import AddDebateTitleMetadataModal from "../../modal/AddDebateTitleModal";

import {
  DEBATE_TITLE_ERROR,
  DELETE_DEBATE_TITLE,
  GET_DEBATE_TITLE_ALL,
} from "../../../context/types";

import MetadataContext from "../../../context/metadata/metadataContext";

import { CUSTOMER } from "../../../constants/index";

// Import Modal Utility Functions

import { getStatusBadge } from "../../../utils/metadataModals/metadataModalsUtils";

const MetadataDebateTitleCard = () => {
  const metadataContext = useContext(MetadataContext);

  const {
    debateTitles,
    currentMetadataItem,
    errors,
    editItem,
    setCurrentItemToNull,
    addItem,
    deleteItem,
  } = metadataContext;

  useEffect(() => {}, [debateTitles]);

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
  // Card Configuration
  const configMetadata = {
    type: "debatetitle",
    getDispatch: GET_DEBATE_TITLE_ALL,
    errorDispatch: DEBATE_TITLE_ERROR,
    deleteDispatch: DELETE_DEBATE_TITLE,
    errorname: "debateTitle",
    modalname: "addDebateTitle",
    tableheaderName: "DATATABLE OF ADDED DEBATE TITLE'S",
    metadatatypeFilter: "debateTitle",
    currentModalName: "ADD/EDIT Debate Title's",
  };

  const {
    type,
    getDispatch,
    deleteDispatch,
    errorDispatch,
    errorname,
    modalname,
    tableheaderName,
    metadatatypeFilter,
    currentModalName,
  } = configMetadata; //ConfigMetadata Destrucutring

  const onChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const initState = () => {
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

  const editItemfunc = (e, _id, metadataType, errorName) => {
    //console.log("In Edit Item for : ", _id);
    editItem(_id, metadataType, errorName);
  };

  const AddEditItemFunc = (
    type,
    getTypeReducer,

    dispatchError,
    errorName
  ) => {
    if (currentMetadataItem) {
      //Call for Edit Action
      setLoading({ buttonLoading: true });
      const currentItemInstance = currentItem;
      delete currentItem["last_modified_time"];
      delete currentItem["modified_user"];

      addItem(
        currentItemInstance,
        type,
        getTypeReducer,
        dispatchError,
        errorName
      ).then((responseMsg) => {
        if (typeof responseMsg === "string") {
          initState();
          swal("Good job!", responseMsg, "success");
        } else {
          initState();
          swal(
            "Awww Snap !!!",
            responseMsg.response.data["errorName"],
            "error"
          );
        }
      });
    } else {
      //Call the Add Speaker Action

      setLoading({ buttonLoading: true });
      const currentItemInstance = currentItem;
      delete currentItem["last_modified_time"];
      delete currentItem["modified_user"];
      delete currentItem["_id"];

      addItem(
        currentItemInstance,
        type,
        getTypeReducer,
        dispatchError,
        errorName
      ).then((responseMsg) => {
        if (typeof responseMsg === "string") {
          initState();
          swal("Good job!", responseMsg, "success");
        } else {
          initState();
          swal(
            "Awww Snap !!!",
            responseMsg.response.data["errorName"],
            "error"
          );
        }
      });
    }
  };

  const DeleteDebateTitle = (type, dispatchType, dispatchError, errorName) => {
    console.log(`[DEBUG -DeleteDebateTitle-CARD] the value of type is ${type}`);
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
            type,
            dispatchType,
            dispatchError,
            errorName
          );

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

  const getTableItems = (
    _id,
    metadataType,

    errorName,
    modalName
  ) => {
    const modal = `#${modalName}-modal-metadata`;
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={(e) => editItemfunc(e, _id, metadataType, errorName)}
        data-toggle="modal"
        data-target={modal}
      >
        Edit
      </button>
    );
  };

  const COLUMNS = [
    {
      Header: "Debates Title (English)",
      Footer: "Debates Title (English)",
      accessor: "name_eng",
      sticky: "left",
    },

    {
      Header: "Debates Title Name (Kannada)",
      Footer: "Debates Title Name (Kannada)",
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
        return getTableItems(
          value,
          //"debatetitle",
          type,
          //"debateTitle",
          errorname,
          //"addDebateTitle"
          modalname
        );
      },
    },
  ];

  return (
    <>
      <div className="row mt-2">
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
                {CUSTOMER === "KLA" ? "Debate Titles" : "Debate Titles"}
              </h3>
              <div className="card-tools">
                <button
                  className={
                    CUSTOMER === "KLA"
                      ? "btn btn-outline-success mr-2"
                      : "btn btn-outline-danger mr-2"
                  }
                  data-toggle="modal"
                  data-target="#addDebateTitle-modal-metadata"
                  onClick={() => setCurrentItemToNull()}
                >
                  {CUSTOMER === "KLA" ? "Add Debate Title" : "Add Debate Title"}
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
                tableHeaderName={tableheaderName}
                CUSTOMER={CUSTOMER}
                columns_table={COLUMNS}
                loading={loading}
                table_data={debateTitles}
                MetadataType={metadatatypeFilter}
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

      <AddDebateTitleMetadataModal
        modalTitle={CUSTOMER === "KLA" ? currentModalName : currentModalName}
        onChange={onChange}
        //speaker={speaker}
        currentItem={currentItem}
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setCurrentItem}
        setLoading={setLoading}
        AddItem={(e) =>
          AddEditItemFunc(
            type,
            // "debatetitle",
            getDispatch,
            // GET_DEBATE_TITLE_ALL,
            errorDispatch,
            errorname
          )
        }
        onDelete={(e) =>
          DeleteDebateTitle(
            type,
            deleteDispatch,
            //DELETE_DEBATE_TITLE,
            //DEBATE_TITLE_ERROR,
            errorDispatch,
            errorname
          )
        }
      />
    </>
  );
};

export default MetadataDebateTitleCard;
