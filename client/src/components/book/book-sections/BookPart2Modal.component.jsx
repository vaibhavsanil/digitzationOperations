import React, { useEffect, useContext, Fragment, useState } from "react";
import swal from "sweetalert";
import MultiSelect from "react-multi-select-component";
import { format } from "date-fns";
// https://github.com/harshzalavadiya/react-multi-select-component#readme
// https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaField from "../../common/TextAreaFieldGroup";

import SelectListGroup from "../../common/SelectListGroup";
import MultiSelectInput from "../../common/MultiSelectInputGroup.component";
import MultiSelectInputMember from "../../common/MultiSelectInputGroupMember.component";

import BookContext from "../../../context/book/bookContext";
import MetadataContext from "../../../context/metadata/metadataContext";

import {
  metadataStateObject,
  metadataStateObjectPart1,
  setInputfieldToNull,
} from "../../../constants/index";
import {
  GET_MEMBER_ALL,
  MEMBER_ERROR,
  GET_DEBATE_TITLE_ALL,
  DEBATE_TITLE_ERROR,
  GET_TAGS_ALL,
  TAGS_ERROR,
  GET_ISSUES_ALL,
  ISSUES_ERROR,
  GET_PORTFOLIO_ALL,
  PORTFOLIO_ERROR,
} from "../../../context/types";

const MetadataSectionModalPart2 = ({
  modalTitle,
  onChange,
  onChangeMultiSelect,
  currentItem,
  setCurrentItem,
  attribute,
  loading,
  setLoading,
  AddItem,
  onDelete,
}) => {
  const bookContext = useContext(BookContext);
  const metadataContext = useContext(MetadataContext);
  const {
    currentMetadata,
    clearcurrentMetadataSection,
    currentBookStructure,
    annexureItems,
  } = bookContext;

  const {
    debateParticipants,
    getItems,
    debateTitles,
    issuesItems,
    tagsItems,
    portfolioItems,

    //[{"status":true,"_id":"5fc0dde916ba283e4af4e72b","book_id_num":1,"annexure_title":"Cauvery Issue","start_page":12,"end_page":13,"last_modified_time":"2020-11-27T11:07:21.595Z","__v":0}]
  } = metadataContext;

  const { buttonLoading, isModalOpen } = loading;

  // Const Add Section

  const AddSectionMetadata = () => {
    formClearSteps(
      setInputFieldsToNull_array,
      clearcurrentMetadataSection,
      setState_function_array
    );
    AddItem();
  };
  // Const Delete Section
  const DeleteSectionMetadata = async () => {
    await onDelete();
    formClearSteps(
      setInputFieldsToNull_array,
      clearcurrentMetadataSection,
      setState_function_array
    );
  };

  const setInputFieldsToNull_array = [
    "start_page",
    "end_page",
    "text_field",
    "question_number",
  ];

  const formClearSteps = (
    input_text_id,
    stateClearFunction,
    local_state_clear_array
  ) => {
    //  This function will clear all input fields & input state after the submission or cancel
    //setInputfieldToNull(input_text_id);
    setCurrentItem(metadataStateObject);
    setInputfieldToNull(input_text_id);
    stateClearFunction();
    local_state_clear_array.map((setstateFunc) => {
      setstateFunc([]);
    });
  };

  const setMultiSelectFromState = (
    metadataStateVar,
    objectMetadata,
    selectedState,
    selectedStateFunction,
    filterFunction
  ) => {
    // Design the function to compare the object id in the metadata state with the objectmetadata

    function filterObject(metadataState, objectMeta, usestateVar) {
      let metaObject;

      objectMeta.map((meta) => {
        if (meta.value === metadataState) {
          metaObject = meta;
        } else {
          //      console.info("[DEBUG filterObject] the value of the if Test Failed ");
        }
      });

      return metaObject;
    }

    // Set Selected Debate Title
    if (typeof metadataStateVar === "string") {
      // let result_selected_values_array = [];
      let result_selected_values = filterObject(
        metadataStateVar,
        objectMetadata,
        selectedState
      );

      //console.info("[DEBUG] for set state to part1", result_selected_values);

      if (result_selected_values) {
        selectedState.push(result_selected_values);
        // return result_selected_values;
      }
    } else if (typeof metadataStateVar === "object") {
      metadataStateVar.map((state) => {
        let result_selected_values = filterObject(
          state,
          objectMetadata,
          selectedState
        );
        if (
          result_selected_values != undefined ||
          result_selected_values != null
        ) {
          // selectedState.map((item) => {
          //   if (item.value != result_selected_values.value) {
          //     selectedState.push(result_selected_values);
          //   }
          // });
          if (result_selected_values) {
            selectedState.push(result_selected_values);
          }
        }
      });
      // console.info("[DEBUG] Selected State for given State is", selectedState);
      //let newState = filterFunction(selectedState);
      // selectedState = newState;
      //return newState;
      //console.info("[DEBUG] Selected State Array ", selectedState);
      // selectedStateFunction([]);
      // newState.map((item) => selectedState.push(item));

      // selectedStateFunction([...newState]);
    }
  };

  const setMultiSelectFromStateDate = (
    metadataStateVar,
    objectMetadata,
    selectedState
  ) => {
    function filterObject(metadataState, objectMeta) {
      let metaObject;
      let newDate = format(new Date(metadataState), "dd-MM-yyyy");

      objectMeta.map((meta) => {
        if (meta.value === newDate) {
          metaObject = meta;
        } else {
          // console.info("[DEBUG filterObject] the value of the if Test Failed ");
        }
      });

      return metaObject;
    }
    // console.info(
    //   "[DEBUG filterObject Dates] the value of Objectmeta ",
    //   objectMetadata
    // );
    let result_selected_values = filterObject(metadataStateVar, objectMetadata);
    selectedState.push(result_selected_values);
  };

  useEffect(() => {
    //https://stackoverflow.com/questions/47019199/why-does-async-await-work-with-react-setstate
    if (
      Object.keys(currentMetadata).length === 0 &&
      currentMetadata.constructor === Object
    ) {
      setCurrentItem(metadataStateObject);

      getItems("member", GET_MEMBER_ALL, MEMBER_ERROR, "memberName");
      getItems(
        "debatetitle",
        GET_DEBATE_TITLE_ALL,
        DEBATE_TITLE_ERROR,
        "debateTitle"
      );
      getItems("issues", GET_ISSUES_ALL, ISSUES_ERROR, "issuesFields");
      getItems(
        "portfolio",
        GET_PORTFOLIO_ALL,
        PORTFOLIO_ERROR,
        "portfolioMinistry"
      );
    } else {
      setCurrentItem(currentMetadata);

      // setMultiSelectFromState(currentMetadata);
      getItems("member", GET_MEMBER_ALL, MEMBER_ERROR, "memberName");
      getItems(
        "debatetitle",
        GET_DEBATE_TITLE_ALL,
        DEBATE_TITLE_ERROR,
        "debateTitle"
      );
      getItems("issues", GET_ISSUES_ALL, ISSUES_ERROR, "issuesFields");
      getItems(
        "portfolio",
        GET_PORTFOLIO_ALL,
        PORTFOLIO_ERROR,
        "portfolioMinistry"
      );
    }
  }, [currentMetadata]);

  const buttonValue = (currentMetadata, attribute) => {
    if (!(Object.keys(currentMetadata).length === 0)) {
      return `Edit ${attribute}`;
    } else if (Object.keys(currentMetadata).length === 0) {
      return `Add ${attribute}`;
    }
    // } else if (!Object.keys(currentAnnexure).length === 0 && buttonLoading) {
    //   return `Editing ${attribute} ...`;
    // } else if (currentAnnexure && buttonLoading) {
    //   return `Adding Annexure ...`;
    // }
  };

  const optionsStatus = [
    { label: "Not-Live", value: false },
    { label: "Live", value: true },
  ];

  const headerStyle = {
    backgroundColor: "#f44336",
  };

  const onSelect = (data) => {
    console.log(data);
  };

  const onRemove = (data) => {
    console.log(data);
  };

  function optionsMultiSelect(data_array, type) {
    // TODO Refactory the repeated code in the repeated block
    var input_box_array = [];

    //console.log("[OPTION MULTI SELECT] array value", data_array);
    if (type === "dates") {
      data_array.map((item) => {
        var input_box_options = {};
        input_box_options.label = item;
        input_box_options.value = item;
        input_box_array.push(input_box_options);
      });
    } else if (type === "members") {
      data_array.map((item) => {
        var input_box_options = {};
        const { _id, name_eng } = item;
        input_box_options.label = name_eng;
        input_box_options.value = _id;
        input_box_array.push(input_box_options);
      });
    } else if (type === "debatetitle") {
      data_array.map((item) => {
        var input_box_options = {};
        const { _id, name_eng } = item;
        input_box_options.label = name_eng;
        input_box_options.value = _id;
        input_box_array.push(input_box_options);
      });
    } else if (type === "issues") {
      data_array.map((item) => {
        var input_box_options = {};
        const { _id, name_eng } = item;
        input_box_options.label = name_eng;
        input_box_options.value = _id;
        input_box_array.push(input_box_options);
      });
    } else if (type === "annexure") {
      data_array.map((item) => {
        var input_box_options = {};
        const { _id, annexure_title } = item;
        input_box_options.label = annexure_title;
        input_box_options.value = _id;
        input_box_array.push(input_box_options);
      });
    } else if (type === "portfolio") {
      data_array.map((item) => {
        var input_box_options = {};
        const { _id, name_eng } = item;
        input_box_options.label = name_eng;
        input_box_options.value = _id;
        input_box_array.push(input_box_options);
      });
    }
    // console.info("[OPTION MULTI SELECT] output value", input_box_array);
    return input_box_array;
  }

  // Dates Session Value

  const datesSession = currentBookStructure.dates_session
    ? optionsMultiSelect(currentBookStructure.dates_session, "dates")
    : [];

  // Members Session Value
  const membersSection = debateParticipants
    ? optionsMultiSelect(debateParticipants, "members")
    : [];

  // Debate Title Value
  const debateTitlesObject = debateTitles
    ? optionsMultiSelect(debateTitles, "debatetitle")
    : [];

  // Issues Value
  const issuesObject = issuesItems
    ? optionsMultiSelect(issuesItems, "issues")
    : [];

  // Portfolio Value
  const portfolioObject = portfolioItems
    ? optionsMultiSelect(portfolioItems, "portfolio")
    : [];

  const annexureObject = annexureItems
    ? optionsMultiSelect(annexureItems, "annexure")
    : [];

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedDebateTitle, setSelectedDebateTitle] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [selectedQuestioner, setSelectedQuestioner] = useState([]);
  const [selectedMinister, setSelectedMinister] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);
  const [selectedAnnexure, setSelectedAnnexure] = useState([]);
  // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript

  // function getUniqueListBy(arr, key) {
  //   //  Array to remove the duplicate entries in the object
  //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  // }

  useEffect(() => {
    const selectDatesInst = selectedDates ? selectedDates[0] : "";
    onChangeMultiSelect(selectDatesInst, "dates");
    //setSelectedDates(getUniqueListBy(selectedDates, "value"));
  }, [selectedDates]);
  useEffect(() => {
    onChangeMultiSelect(selectedMembers, "members");
    // setSelectedDates(getUniqueListBy(selectedMembers, "value"));
  }, [selectedMembers]);
  useEffect(() => {
    onChangeMultiSelect(selectedDebateTitle, "debatetitle");
  }, [selectedDebateTitle]);
  useEffect(() => {
    onChangeMultiSelect(selectedIssues, "issues");
  }, [selectedIssues]);
  useEffect(() => {
    onChangeMultiSelect(selectedQuestioner, "questioner");
  }, [selectedQuestioner]);
  useEffect(() => {
    onChangeMultiSelect(selectedMinister, "minister");
  }, [selectedMinister]);
  useEffect(() => {
    onChangeMultiSelect(selectedPortfolio, "portfolio");
  }, [selectedPortfolio]);

  useEffect(() => {
    onChangeMultiSelect(selectedAnnexure, "annexure");
  }, [selectedAnnexure]);

  useEffect(() => {
    // console.log("[Aneexure Items] ", annexureItems);
  }, [annexureItems]);

  if (
    !(
      Object.keys(currentMetadata).length === 0 &&
      currentMetadata.constructor === Object
    ) &&
    currentItem.debate_title_subject != "" &&
    !selectedDebateTitle.length >= 1
  ) {
    // Select Debate Title
    const debate_title_state = setMultiSelectFromState(
      currentItem.debate_title_subject,
      debateTitlesObject,
      selectedDebateTitle,
      setSelectedDebateTitle
    );
    // setSelectedDebateTitle([]);
    // debate_title_state.map((item) => selectedDebateTitle.push(item));

    // // Select Minister Portfolio
    setMultiSelectFromState(
      currentItem.minister_portfolio,
      portfolioObject,
      selectedPortfolio,
      setSelectedPortfolio
    );
    // //setSelectedPortfolio(unique_element(selectedPortfolio));

    // // Select Minister Name
    setMultiSelectFromState(
      currentItem.minister_name,
      membersSection,
      selectedMinister,
      setSelectedMinister
    );
    // //setSelectedMinister((selectedMinister));

    // // Select Questioner's Name
    setMultiSelectFromState(
      currentItem.questioner_name,
      membersSection,
      selectedQuestioner,
      setSelectedQuestioner
    );

    // //setSelectedQuestioner((selectedQuestioner));

    // // Select Debate Participants Name
    setMultiSelectFromState(
      currentItem.debate_participants,
      membersSection,
      selectedMembers,
      setSelectedMembers
    );

    // // setSelectedMembers((selectedMembers));

    // // Select Annexure's
    setMultiSelectFromState(
      currentItem.annexure,
      annexureObject,
      selectedAnnexure,
      setSelectedAnnexure
    );
    // //setSelectedAnnexure((selectedAnnexure));
    // // Select Issues
    setMultiSelectFromState(
      currentItem.issues_section,
      issuesObject,
      selectedIssues,
      setSelectedIssues
    );

    // // setSelectedIssues((selectedIssues));

    // // Select Dates
    setMultiSelectFromStateDate(
      currentItem.debate_section_date,
      datesSession,
      selectedDates,
      setSelectedDates
    );
    //setSelectedDates((selectedDates));
  }

  const setState_function_array = [
    setSelectedDates,
    setSelectedMembers,
    setSelectedDebateTitle,
    setSelectedIssues,
    setSelectedQuestioner,
    setSelectedQuestioner,
    setSelectedMinister,
    setSelectedPortfolio,
    setSelectedAnnexure,
  ];

  return (
    <Fragment>
      <div className="modal fade" id="addPart2-modal-metadata">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={headerStyle}>
              <h4 className="modal-title">{modalTitle}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  formClearSteps(
                    setInputFieldsToNull_array,
                    clearcurrentMetadataSection,
                    setState_function_array
                  )
                }
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <TextFieldGroup
                  // placeholder={placeholderValue.placeHolderEnglish}
                  placeholder="Start Page"
                  name="start_page"
                  value={currentItem.start_page}
                  onChange={onChange}
                  error={false}
                  id="start_page"
                  // labelText={placeholderValue.placeHolderEnglish}
                  labelText="Start Page"
                  formWidth="col-md"
                  required={true}
                />

                <TextFieldGroup
                  //placeholder={placeholderValue.placeHolderKannada}
                  placeholder="End Page"
                  name="end_page"
                  value={currentItem.end_page}
                  onChange={onChange}
                  error={false}
                  id="end_page"
                  //labelText={placeholderValue.placeHolderKannada}
                  labelText="End Page"
                  formWidth="col-md"
                  required={true}
                  inline_style="ml-4"
                />
                <div className="col-12">
                  <div className="form-group">
                    <label>Select Date</label>
                    <MultiSelect
                      options={datesSession}
                      value={selectedDates}
                      onChange={setSelectedDates}
                      labelledBy={"Select Date"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Select Debate Participants</label>
                    <MultiSelect
                      options={membersSection}
                      value={selectedMembers}
                      onChange={setSelectedMembers}
                      labelledBy={"Select Debate Participants"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Select Debate Title</label>
                    <MultiSelect
                      options={debateTitlesObject}
                      value={selectedDebateTitle}
                      onChange={setSelectedDebateTitle}
                      labelledBy={"Select Debate Title Subject"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Debate Subject</label>
                    <TextAreaField
                      name="debate_subject_kan"
                      placeholder="Enter the Debate Subject"
                      value={currentItem.debate_subject_kan}
                      onChange={onChange}
                      id="text_field"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Select Issues</label>
                    <MultiSelect
                      options={issuesObject}
                      value={selectedIssues}
                      onChange={setSelectedIssues}
                      labelledBy={"Select Issues's"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Select Ministry</label>
                    <MultiSelect
                      options={portfolioObject}
                      value={selectedPortfolio}
                      onChange={setSelectedPortfolio}
                      labelledBy={"Select Portfolio"}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label>Select Debate Annexure's</label>
                    {
                      //console.info("[annexure object]", annexureObject)
                    }
                    <MultiSelect
                      options={annexureObject}
                      value={selectedAnnexure}
                      onChange={setSelectedAnnexure}
                      labelledBy={"Select Debate Participants"}
                    />
                  </div>
                </div>
              </div>

              <SelectListGroup
                placeholder="Status"
                name="status"
                value={currentItem.status}
                onChange={onChange}
                error={false}
                id="speakerStatus"
                labelText="Status"
                formWidth="col-6"
                options={optionsStatus}
              />
              {currentItem.modified_time && (
                <TextFieldGroup
                  placeholder=""
                  name="lastModifiedAt"
                  value={format(
                    new Date(currentItem.modified_time),
                    "dd/MM/yyyy"
                  )}
                  onChange={onChange}
                  // error={errors.last_modified_time}
                  id="lastmodifiedat"
                  labelText="Last Modified At"
                  formWidth="col-md"
                  disabled="true"
                />
              )}

              {currentItem.modified_user && (
                <TextFieldGroup
                  placeholder=""
                  name="lastModifiedBy"
                  value={currentItem.modified_user}
                  onChange={onChange}
                  //   error={errors.modified_user}
                  id="lastmodifiedby"
                  labelText="Last Modified By"
                  formWidth="col-md"
                  disabled="true"
                />
              )}
            </div>
            <div className="justify-content-between">
              {currentItem.modified_time ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={DeleteSectionMetadata}
                  style={{
                    margin: "10px",
                  }}
                >
                  Delete
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() =>
                    formClearSteps(
                      setInputFieldsToNull_array,
                      clearcurrentMetadataSection,
                      setState_function_array
                    )
                  }
                  style={{
                    margin: "10px",
                  }}
                >
                  Cancel
                </button>
              )}

              <input
                type="submit"
                className={
                  buttonLoading
                    ? "btn btn-primary disabled"
                    : "btn btn-primary "
                }
                onClick={AddSectionMetadata}
                data-dismiss="modal"
                //value={currentSpeaker ? "Edit Speaker" : "Add Speaker"}
                value={buttonValue(
                  currentMetadata,
                  attribute
                  //buttonValue
                )}
                style={{
                  float: "right",
                  margin: "10px",
                }}
              />
            </div>
          </div>
          <div className="modal-footer justify-content-between"></div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </Fragment>
  );
};

MetadataSectionModalPart2.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  loading: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  AddItem: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
};

export default MetadataSectionModalPart2;
