import React, { useState, useContext, useEffect, useRef } from "react";
import swal from "sweetalert";
import { format } from "date-fns";

import { SearchTableNew } from "../../utils/SearchTableNew.component";
import { modalHeaderBackColour } from "../../constants";
import BookContext from "../../context/book/bookContext";
import { metadataStateObject } from "../../constants/index";
import BookPart1Modal from "./book-sections/BookPart1Modal.component";
import BookPart2Modal from "./book-sections/BookPart2Modal.component";

import { CUSTOMER, styleDashBoardCard } from "../../constants/index";

const BookMetadataTable = () => {
  const [metadataState, setMetadataState] = useState(metadataStateObject);

  const [loading, setLoading] = useState({
    isModalOpen: true,
    buttonLoading: false,
  });

  const bookContext = useContext(BookContext);
  const {
    addSection,
    editSection,
    currentMetadata,
    currentBookStructure,
    clearcurrentMetadataSection,
    deleteSection,
    errors,
    sectionalMetadataItems,
    getMetadataItems,
  } = bookContext;

  useEffect(() => {
    if (currentBookStructure.length !== 0) {
      getMetadataItems(currentBookStructure.bookId);
      // setAnnexureItem({
      //   ...annexItem,
      //   book_id_num: currentBookStructure.bookId,
      // });
    }
  }, [currentBookStructure]);

  // setMetadataState({
  //   ...metadataState,
  //   book_id: currentBookStructure.bookId,
  // });

  // if (currentBookStructure) {
  //   console.info(
  //     "[DEBUG] Current BookStructure with book id ",
  //     currentBookStructure.bookId
  //   );

  //   setMetadataState({
  //     ...metadataState,
  //     book_id: currentBookStructure.bookId,
  //   });
  // }

  // console.info(
  //   ("2020-06-12T18:30:00.000Z").toDateString())
  // );

  const onChange = (e) => {
    setMetadataState({ ...metadataState, [e.target.name]: e.target.value });
  };

  const handleChangeMultiSelect = (valueMultiselect, type) => {
    // Refer https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript

    // To filter out duplicate arrays
    function uniq_array(a) {
      return Array.from(new Set(a));
    }

    if (valueMultiselect) {
      if (type === "dates") {
        const { value } = valueMultiselect;
        // console.info("[DEBUG] Handle Multiselect Dates to String value", value);
        let mydateParts = value.split("-");
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        let dateinformat = new Date(
          mydateParts[2],
          mydateParts[1] - 1,
          mydateParts[0]
        );
        // console.info(
        //   "[DEBUG] Handle Multiselect Dates to String value",
        //   dateinformat
        // );
        setMetadataState({
          ...metadataState,
          debate_section_date: dateinformat,
        });
        // console.info(
        //   "[DEBUG] Handle Multiselect Dates to String format",
        //   dateinformat.toISOString()
        // );
        // console.info(
        //   "[DEBUG] Handle Multiselect Dates to String format",
        //   dateinformat
        // );
        // console.info(
        //   "[DEBUG] Handle Multiselect Dates to String format",
        //   dateinformat.toDateString()
        // );
      }

      if (type === "members") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });

        // let value_array_set = Array.from(new Set(value_array));

        setMetadataState({
          ...metadataState,
          debate_participants: value_array,
        });
      }
      if (type === "debatetitle") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          debate_title_subject: value_array[0],
        });
      }
      if (type === "issues") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          issues_section: value_array,
        });
      }

      if (type === "questioner") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          questioner_name: value_array[0],
        });
      }

      if (type === "minister") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          minister_name: value_array[0],
        });
      }
      if (type === "portfolio") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          minister_portfolio: value_array[0],
        });
      }

      if (type === "annexure") {
        let value_array = [];

        valueMultiselect.map((valueArray) => {
          let val;
          val = valueArray.value;

          value_array.push(val);
        });
        setMetadataState({
          ...metadataState,
          annexure: value_array[0],
        });
      }
    }

    // let value = Array.from(e.target.selectedOptions, (option) => option.value);
    // console.log("[Handle Changer] the value parameter", value);

    // setMetadataState({ ...metadataState, [e.target.name]: value });
  };

  const editItemfunc = (e, _id) => {
    //console.log("In Edit Item for : ", _id);
    editSection(_id);
  };

  const getStatusBadge = (status) => {
    if (status) {
      return <span className="badge badge-success">Live</span>;
    } else {
      return <span className="badge badge-danger">Not Live</span>;
    }
  };

  const initMetadataState = () => {
    // Intializing the Sectional Metadata State
    setMetadataState(metadataStateObject);
    setLoading({ buttonLoading: false });
  };

  const getTableItems = (_id, sectiontype) => {
    let modalTarget;
    if (sectiontype === "part1") {
      modalTarget = "#addPart1-modal-metadata";
    } else {
      modalTarget = "#addPart2-modal-metadata";
    }
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={(e) => editItemfunc(e, _id)}
        data-toggle="modal"
        data-target={modalTarget}
      >
        Edit
      </button>
    );
  };

  const COLUMNS = [
    {
      Header: "Book Id",
      Footer: "Book Id",
      accessor: "book_id",
      sticky: "left",
    },

    {
      Header: "Section Type",
      Footer: "Section Type",
      accessor: "section_type",
      sticky: "left",
      Cell: ({ value }) => {
        let classes = "badge ";
        if (value === "part1") {
          classes += `badge-danger`;
        } else {
          classes += "badge-success";
        }
        return (
          <span className={classes}>
            {value === "part1" ? "Part1 Q & A" : "Part2 Other Q & A"}
          </span>
        );
      },
    },
    {
      Header: "Debate Title",
      Footer: "Debate Title",
      accessor: "debate_title_subject",
      Cell: ({ value }) => {
        if (value === undefined) {
          return "NA";
        } else {
          return value.name_eng;
        }
      },
    },
    {
      Header: "Debate Subject",
      Footer: "Debate Subject",
      accessor: "debate_subject_kan",
    },
    {
      Header: "Debate Date",
      Footer: "Debate Date",
      accessor: "debate_section_date",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    // {
    //   Header: "Debate Participants",
    //   Footer: "Debate Participants",
    //   accessor: "debate_participants",
    //   Cell: ({ value }) => {
    //     // console.info("[Table Debate Particiapant] ", value);
    //     let itemArray = [];
    //     value.map((item) => {
    //       // console.info("[Table Debate Particiapant Map] ", item);
    //       itemArray.push(item.name_eng);
    //     });
    //     //console.info("[Table Debate Particiapant ItemArray] ", itemArray);
    //     const members = itemArray.join(", ");
    //     return members;
    //   },
    // },

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
      Cell: (props) => {
        // console.info(
        //   " [DEBUG Action Column Table ]",
        //   props.cell.row.original.section_type
        // );
        //  Access Section Type in props props.cell.row.original.section_type
        return getTableItems(props.value, props.cell.row.original.section_type);
      },
    },
  ];

  const setSectionTypeState = (type) => {
    if (type === "part1") {
      setMetadataState({
        ...metadataState,
        section_type: type,
      });
      // console.info("[SET SECTION TYPE] call ", metadataState);
    } else {
      setMetadataState({
        ...metadataState,
        section_type: type,
      });
    }
  };

  const AddSection = (bookid, sectiontype) => {
    // Edit Book Section Action

    if (Object.keys(currentMetadata).length !== 0) {
      setLoading({ buttonLoading: true });

      //setSectionTypeState(sectiontype);
      // Setting Section type Part1 Q & A or Other than Q & A
      // if (sectiontype == "part1") {
      //   setMetadataState({
      //     ...metadataState,
      //     section_type: "part1",
      //   });
      // } else {
      //   setMetadataState({
      //     ...metadataState,
      //     section_type: "part2",
      //   });
      // }
      const currentItemInstance = metadataState;
      delete currentItemInstance["last_modified_time"];
      delete currentItemInstance["modified_user"];
      delete currentItemInstance["_v"];
      currentItemInstance.book_id = currentBookStructure.bookId;
      currentItemInstance.struct_id = currentBookStructure._id;

      //     struct_id: currentBookStructure._id,
      if (sectiontype === "part1") {
        currentItemInstance.section_type = "part1";
      } else {
        currentItemInstance.section_type = "part2";
      }

      addSection(
        currentItemInstance,
        metadataState.book_id,
        metadataState._id
      ).then((responseMsg) => {
        if (responseMsg === "success") {
          initMetadataState();
          clearcurrentMetadataSection();
          swal(
            "Good job!",
            "The Book Section edited Successfully!!!",
            "success"
          );
          setMetadataState(metadataStateObject);
        } else {
          initMetadataState();
          swal(
            "Awww Snap !!!",
            "Book Section not edited successfully !!! Please Try Again ",
            "error"
          );
        }
      });
    } else {
      //Call the Add Book Section

      setLoading({ buttonLoading: true });

      //setSectionTypeState(sectiontype);
      // // Setting Section type Part1 Q & A or Other than Q & A
      // if (sectiontype == "part1") {
      //   setMetadataState({
      //     ...metadataState,
      //     section_type: "part1",
      //   });
      // } else {
      //   setMetadataState({
      //     ...metadataState,
      //     section_type: "part2",
      //   });
      // }

      const currentItemInstance = metadataState;
      delete currentItemInstance["last_modified_time"];
      delete currentItemInstance["modified_user"];
      delete currentItemInstance["_id"];
      currentItemInstance.book_id = currentBookStructure.bookId;
      currentItemInstance.struct_id = currentBookStructure._id;
      if (sectiontype === "part1") {
        currentItemInstance.section_type = "part1";
      } else {
        currentItemInstance.section_type = "part2";
      }

      //      console.info("[Call from Book Set Action] ", metadataState);

      addSection(currentItemInstance, currentItemInstance.bookid).then(
        (responseMsg) => {
          if (responseMsg === "success") {
            initMetadataState();
            swal(
              "Good job!",
              "The Book Section Added is added successfully !!!",
              "success"
            );
            setMetadataState(metadataStateObject);
          } else {
            initMetadataState();
            swal(
              "Awww Snap !!!",
              "The Book Section was not added successfully,Please Try Again !!!",
              "error"
            );
          }
        }
      );
    }
  };

  const DeleteMetadata = () => {
    //const _id = currentMetadata._id;
    swal({
      title: `Are you sure you want to delete ${currentMetadata.debate_subject_kan} ?`,
      text: "Once deleted, you will not be able to recover this field!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSection(currentBookStructure.bookId, currentMetadata._id)
          .then((msg) => {
            if (msg === "success") {
              clearcurrentMetadataSection();
              swal(
                `${currentMetadata.debate_subject_kan}  has been deleted !!!`,
                {
                  icon: "success",
                }
              );
            } else {
              swal(
                `Poof! ${currentMetadata.debate_subject_kan} cannot be deleted .Contact System Administrator   `,
                {
                  icon: "error",
                }
              );
            }
          })
          .catch((err) =>
            console.log("[DEBUG-Delete Metadata] Logging info ", err)
          );
      } else {
        swal(` ${currentMetadata.debate_title_subject}  is safe!`);
      }
    });
  };

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
          <b> Book Sections's</b>{" "}
        </h3>
        <div className="card-tools"></div>
      </div>
      {/* Card Header End */}
      {/* Card Body Start */}

      <div className="card-body">
        <SearchTableNew
          tableHeaderName="Added Metadata Section's"
          CUSTOMER={CUSTOMER}
          MetadataType="metadata"
          columns_table={COLUMNS}
          table_data={sectionalMetadataItems}
          number_sections={sectionalMetadataItems.length}
        />
      </div>

      <div className="card-footer">{/* Empty Footer */}</div>
      <BookPart1Modal
        modalTitle={
          CUSTOMER === "KLA"
            ? "Add [Part1] Question & Answer's"
            : "Add [Part1] Question & Answer's"
        }
        onChange={onChange}
        onChangeMultiSelect={handleChangeMultiSelect}
        //speaker={speaker}
        currentItem={metadataState}
        attribute="Question & Answer's"
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setMetadataState}
        setLoading={setLoading}
        AddItem={(e) => AddSection(metadataState.book_id, "part1")}
        onDelete={(e) => DeleteMetadata()}
      />
      <BookPart2Modal
        modalTitle={
          CUSTOMER === "KLA"
            ? "Add [Part2]Other than Question & Answer's"
            : "Add [Part2]Other than Question & Answer's"
        }
        onChange={onChange}
        onChangeMultiSelect={handleChangeMultiSelect}
        //speaker={speaker}
        currentItem={metadataState}
        attribute="Other Question & Answer's"
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setMetadataState}
        setLoading={setLoading}
        AddItem={(e) => AddSection(metadataState.book_id, "part2")}
        onDelete={(e) => DeleteMetadata()}
      />
      {/* /.card-footer*/}
      {/* <BookPart2Modal
        modalTitle={
          CUSTOMER === "KLA"
            ? "Add [Part2] Other than Question & Answer's"
            : "Add [Part2] Other than Question & Answer's"
        }
        onChange={onChange}
        //speaker={speaker}
        currentItem={metadataState}
        attribute="Other than (Q & A)"
        loading={loading}
        //setSpeaker={setSpeaker}
        setCurrentItem={setMetadataState}
        setLoading={setLoading}
        AddItem={(e) => AddSection(currentBookStructure.bookId)}
        onDelete={(e) => DeleteMetadata()}
      /> */}
    </div>
  );
};

export default BookMetadataTable;
