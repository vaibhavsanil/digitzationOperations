import React, { Fragment, useContext, useState } from "react";
import swal from "sweetalert";

import { SearchTableNew } from "../../../utils/SearchTableNew.component";
import AddMetadataItemModal from "../../modal/AddMemberModal";

//Imported Add Speaker Functions
// import {
//   AddSpeaker,
//   initSpeakerState,
// } from "../../../utils/metadataModals/metadataModalsUtils";

//import AddItemModal from "../../../utils/metadataModals/MetadataSectionModal.component";

import {
  MEMBER_ERROR,
  DELETE_MEMBER,
  GET_MEMBER_ALL,
} from "../../../context/types";

//Import the Context
import MetadataContext from "../../../context/metadata/metadataContext";

import {
  TABLE_HEADER_SPEAKER,
  CUSTOMER,
  ADD_EDIT_SPEAKER_TITLE_MODAL,
  ADD_EDIT_CHAIRMAN_TITLE_MODAL,
} from "../../../constants/index";

const MetadataParticipantsCard = () => {
  const metadataContext = useContext(MetadataContext);
  const {
    currentMetadataItem,
    errors,

    debateParticipants,
    addSpeaker,
    editItem,
    setCurrentItemToNull,
    addItem,
    deleteItem,
  } = metadataContext;

  // const [speaker, setSpeaker] = useState({
  //   name_eng: "",
  //   name_kan: "",
  //   status: null,
  //   id: null,
  //   lastModifiedAt: "",
  //   lastModifiedBy: "  ",
  // });
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
    //console.log("In Edit Item for : ", _id);
    editItem(_id, "member", "memberName");
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
        data-target="#addMember-modal-metadata"
      >
        Edit
      </button>
    );
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

  const AddEditItemFunc = (
    type,
    getTypeReducer,

    dispatchError,
    errorName
  ) => {
    if (currentMetadataItem) {
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
          swal("Awww Snap !!!", responseMsg.response.data.memberName, "error");
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
          swal("Awww Snap !!!", responseMsg.response.data.memberName, "error");
        }
      });
    }
  };

  const DeleteMember = () => {
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
            "member",
            DELETE_MEMBER,
            MEMBER_ERROR,
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

  const COLUMNS = [
    {
      Header: "Member's Name (English)",
      Footer: "Member's Name (English)",
      accessor: "name_eng",
      sticky: "left",
    },

    {
      Header: "Member's Name (Kannada)",
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

  return (
    <Fragment>
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
                {CUSTOMER === "KLA"
                  ? "DEBATE PARTICIPANTS"
                  : "DEBATE PARTICIPANTS"}
              </h3>
              <div className="card-tools">
                <button
                  className={
                    CUSTOMER === "KLA"
                      ? "btn btn-outline-success mr-2"
                      : "btn btn-outline-danger mr-2"
                  }
                  data-toggle="modal"
                  data-target="#addMember-modal-metadata"
                  onClick={() => setCurrentItemToNull()}
                >
                  {CUSTOMER === "KLA" ? "Add Member" : "Add Member"}
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
                tableHeaderName="DATATABLE OF ADDED DEBATE PARTICIPANTS"
                CUSTOMER={CUSTOMER}
                columns_table={COLUMNS}
                loading={loading}
                table_data={debateParticipants}
                MetadataType="Member"
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
            ? "ADD/EDIT Member Particiapnts"
            : "ADD/EDIT Member Particiapnts"
        }
        onChange={onChange}
        //speaker={speaker}
        currentItem={currentItem}
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setCurrentItem}
        setLoading={setLoading}
        AddItem={(e) =>
          AddEditItemFunc("member", GET_MEMBER_ALL, MEMBER_ERROR, "memberName")
        }
        onDelete={DeleteMember}
      />
    </Fragment>
  );
};

MetadataParticipantsCard.propTypes = {};

export default MetadataParticipantsCard;
