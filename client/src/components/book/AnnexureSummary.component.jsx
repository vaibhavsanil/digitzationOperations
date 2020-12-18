import React, { useState, useEffect, useContext } from "react";
// import ReactFlexyTable from "react-flexy-table";
import swal from "sweetalert";
//import "react-flexy-table/dist/index.css";
//import deleteIcon from "../icons/icons8-delete-24.png";
//import editIcon from "../icons/icons8-eye-30.png";

import { SearchTableNew } from "../../utils/SearchTableNew.component";

//Import Book Context from Context
import BookContext from "../../context/book/bookContext";

// Import Add Annexure Modal

import AnnexureModal from "./book-sections/AnnexureModal.component";

import {
  CUSTOMER,
  styleDashBoardCard,
  modalHeaderBackColour,
} from "../../constants/index";
import { CLEAR_CURRENT_ANNEXURE } from "../../context/types";

const AnnexureSummary = () => {
  const bookContext = useContext(BookContext);
  const {
    annexureItems,
    currentAnnexure,
    currentBookStructure,
    addAnnexure,
    getAnnexureItems,
    editAnnexure,
    deleteAnnexure,
    clearcurrentAnnexure,
  } = bookContext;

  useEffect(() => {
    if (currentBookStructure.length !== 0) {
      getAnnexureItems(currentBookStructure.bookId);
      setAnnexureItem({
        ...annexItem,
        book_id_num: currentBookStructure.bookId,
      });
    }
  }, [currentBookStructure]);

  useEffect(() => {}, [annexureItems]);

  const [annexItem, setAnnexureItem] = useState({
    _id: null,
    book_id_num: null,
    annexure_title: null,
    start_page: null,
    end_page: null,
    status: null,

    last_modified_time: null,
    modified_user: null,
  });

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  const onChange = (e) => {
    setAnnexureItem({ ...annexItem, [e.target.name]: e.target.value });
  };

  const getStatusBadge = (status) => {
    if (status) {
      return <span className="badge badge-success">Live</span>;
    } else {
      return <span className="badge badge-danger">Not Live</span>;
    }
  };

  const editItemfunc = (e, _id) => {
    //console.log("In Edit Item for : ", _id);
    editAnnexure(_id);
  };

  const getTableItems = (_id) => {
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={(e) => editItemfunc(e, _id)}
        data-toggle="modal"
        data-target="#addAnnexure-modal-metadata"
      >
        Edit
      </button>
    );
  };

  const initAnnexureState = () => {
    // Intializing the Speaker State to Null
    setAnnexureItem({
      _id: null,
      book_id_num: "",
      annexure_title: "",
      start_page: null,
      end_page: null,
      status: null,

      last_modified_time: null,
      modified_user: null,
    });
    setLoading({ buttonLoading: false });
  };

  const AddAnnexure = (bookid) => {
    // Edit Annexure Action

    if (currentAnnexure) {
      setLoading({ buttonLoading: true });
      const currentItemInstance = annexItem;
      delete currentItemInstance["last_modified_time"];
      delete currentItemInstance["modified_user"];
      delete currentItemInstance["_v"];

      addAnnexure(currentItemInstance, bookid).then((responseMsg) => {
        if (responseMsg === "success") {
          initAnnexureState();
          clearcurrentAnnexure();
          swal("Good job!", "The Annexure edited Successfully!!!", "success");
        } else {
          initAnnexureState();
          swal(
            "Awww Snap !!!",
            "Annexure not edited successfully !!! Please Try Again ",
            "error"
          );
        }
      });
    } else {
      //Call the Add Speaker Action

      setLoading({ buttonLoading: true });
      const currentItemInstance = annexItem;
      delete currentItemInstance["last_modified_time"];
      delete currentItemInstance["modified_user"];
      delete currentItemInstance["_id"];

      addAnnexure(currentItemInstance, bookid).then((responseMsg) => {
        if (responseMsg === "success") {
          initAnnexureState();
          swal(
            "Good job!",
            "The Annexure was added successfully !!!",
            "success"
          );
        } else {
          initAnnexureState();
          swal(
            "Awww Snap !!!",
            "The Annexure was not added successfully !!!",
            "error"
          );
        }
      });
    }
  };

  const DeleteAnnexure = () => {
    const _id = currentAnnexure._id;
    swal({
      title: `Are you sure you want to delete ${currentAnnexure.annexure_title} ?`,
      text: "Once deleted, you will not be able to recover this field!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAnnexure(currentAnnexure._id, currentAnnexure.book_id_num)
          .then((msg) => {
            if (msg === "success") {
              clearcurrentAnnexure();
              swal(`${currentAnnexure.annexure_title}  has been deleted !!!`, {
                icon: "success",
              });
            } else {
              swal(
                `Poof! ${currentAnnexure.annexure_title} cannot be deleted .Contact System Administrator   `,
                {
                  icon: "error",
                }
              );
            }
          })
          .catch((err) =>
            console.log("[DEBUG-Delete Annexure] Logging into ", err)
          );
      } else {
        swal(` ${currentAnnexure.annexure_title}  is safe!`);
      }
    });
  };

  const COLUMNS = [
    {
      Header: "Book Id (English)",
      Footer: "Book Id (English)",
      accessor: "book_id_num",
      sticky: "left",
    },

    {
      Header: "Annexure Title",
      Footer: "Annexure Title",
      accessor: "annexure_title",
      sticky: "left",
    },
    {
      Header: "Start Page",
      Footer: "Start Page",
      accessor: "start_page",
    },
    {
      Header: "End Page",
      Footer: "End Page",
      accessor: "end_page",
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
    <div className="card" style={styleDashBoardCard}>
      {/* Card Header Start */}
      <div className="card-header" style={modalHeaderBackColour(CUSTOMER)}>
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
          <b> Book Annexure's</b>{" "}
        </h3>
        <div className="card-tools"></div>
      </div>
      {/* Card Header End */}
      {/* Card Body Start */}

      <div className="card-body">
        <SearchTableNew
          tableHeaderName="Added Annexure's Table"
          CUSTOMER={CUSTOMER}
          MetadataType="annexure"
          columns_table={COLUMNS}
          table_data={annexureItems}
        />
      </div>

      <div className="card-footer">{/* Empty Footer */}</div>

      {/* /.card-footer*/}
      <AnnexureModal
        modalTitle={CUSTOMER === "KLA" ? "Add Annexure's" : "Add Annexure's"}
        onChange={onChange}
        //speaker={speaker}
        currentItem={annexItem}
        attribute="Annexure's"
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setAnnexureItem}
        setLoading={setLoading}
        AddItem={(e) => AddAnnexure(currentBookStructure.bookId)}
        onDelete={(e) => DeleteAnnexure()}
      />
    </div>
  );
};

export default AnnexureSummary;
