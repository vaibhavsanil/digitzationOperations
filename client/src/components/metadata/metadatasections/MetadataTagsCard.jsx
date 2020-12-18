import React, { Fragment, useContext, useState, useEffect } from "react";
import swal from "sweetalert";

import { SearchTableNew } from "../../../utils/SearchTableNew.component";
import AddTagsMetadataModal from "../../modal/AddTags.Component";

import { GET_TAGS_ALL, TAGS_ERROR, DELETE_TAGS } from "../../../context/types";

import MetadataContext from "../../../context/metadata/metadataContext";

import { CUSTOMER } from "../../../constants/index";

// Import Modal Utility Functions

import { getStatusBadge } from "../../../utils/metadataModals/metadataModalsUtils";

const MetadataTagsCard = () => {
  const metadataContext = useContext(MetadataContext);

  const {
    currentMetadataItem,
    errors,
    editItem,
    setCurrentItemToNull,
    addItem,
    deleteItem,
    tagsItems,
  } = metadataContext;

  //Changed the below useeffect for relevant variables

  useEffect(() => {}, [tagsItems]);

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
    cardHeader: "Tag's",
    type: "tags",
    getDispatch: GET_TAGS_ALL,
    errorDispatch: TAGS_ERROR,
    deleteDispatch: DELETE_TAGS,
    errorname: "tagsFields",
    modalname: "addTags",
    tableheaderName: "Datatable Of Added Tag's",
    metadatatypeFilter: "tags",
    modalHeaderName: "ADD/EDIT Tag's",
    modalLabelNames: {
      english: "Tags Name (English)",
      kannada: "Tags Name (Kannada)",
    },
    addButtonValue: "Add Tags",
    modalButtonAttribute: "Tags",
  };

  const {
    cardHeader,
    type,
    getDispatch,
    deleteDispatch,
    errorDispatch,
    errorname,
    modalname,
    tableheaderName,
    metadatatypeFilter,
    modalHeaderName,
    modalLabelNames,
    addButtonValue,
    modalButtonAttribute,
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
        console.log(
          `[DEBUG-ADDItemFunc] the response message is ${responseMsg}`
        );
        console.log(
          `[DEBUG-ADDItemFunc] the type of response message is ${typeof responseMsg}`
        );
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

  const DeleteItem = (type, dispatchType, dispatchError, errorName) => {
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
      Header: `${modalLabelNames.english}`,
      Footer: `${modalLabelNames.english}`,
      accessor: "name_eng",
      sticky: "left",
    },

    {
      Header: `${modalLabelNames.kannada}`,
      Footer: `${modalLabelNames.kannada}`,
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
                {CUSTOMER === "KLA" ? cardHeader : cardHeader}
              </h3>
              <div className="card-tools">
                <button
                  className={
                    CUSTOMER === "KLA"
                      ? "btn btn-outline-success mr-2"
                      : "btn btn-outline-danger mr-2"
                  }
                  data-toggle="modal"
                  data-target={`#${modalname}-modal-metadata`}
                  onClick={() => setCurrentItemToNull()}
                >
                  {CUSTOMER === "KLA" ? addButtonValue : addButtonValue}
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
                table_data={tagsItems}
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

      <AddTagsMetadataModal
        modalTitle={CUSTOMER === "KLA" ? modalHeaderName : modalHeaderName}
        onChange={onChange}
        //speaker={speaker}
        currentItem={currentItem}
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setCurrentItem}
        setLoading={setLoading}
        modalLabelNames={modalLabelNames}
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
          DeleteItem(type, deleteDispatch, errorDispatch, errorname)
        }
        modalname={modalname}
        attribute={modalButtonAttribute}
      />
    </>
  );
};

export default MetadataTagsCard;
