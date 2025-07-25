import React, { useEffect, useContext, useState, Fragment } from "react";
//import swal from "sweetalert";

import PropTypes from "prop-types";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import SelectListGroup from "../../components/common/SelectListGroup";

import MetadataContext from "../../context/metadata/metadataContext";
import AlertContext from "../../context/alert/alertContext";

const MetadataSectionModal = ({
  modalTitle,
  speaker,
  // setSpeaker,
  setCurrentItem,
  loading,
  setLoading,
  AddSpeaker,
  onChange,
  currentItem,
  onDelete,
  attribute,
  //  labelValues,
}) => {
  const metadataContext = useContext(MetadataContext);
  //const alertContext = useContext(AlertContext);
  const {
    currentSpeaker,
    errors,
    addSpeaker,
    currentMetadataItem,
    setCurrentItemToNull,
  } = metadataContext;

  const { buttonLoading, isModalOpen } = loading;
  //  console.log("The Label Values passed from modal", labelValues);
  //const placeholderValue = labelValues;
  //console.log(
  //  "The placeholderValue Values passed from modal",
  //  placeholderValue
  //);

  useEffect(() => {
    //  console.log("Use Effect Metadata Section Modal Called");
    if (currentMetadataItem != null) {
      setCurrentItem(currentMetadataItem);
    } else {
      setCurrentItem({
        name_eng: "",
        name_kan: "",
        status: null,
        id: null,
        last_modified_time: null,
        modified_user: null,
      });
      // placeholderValue = placeholderLabelValue(attribute);
      // console.log("Placeholder Value from useEffect ", placeholderValue);
      //console.log("Attribute Value from useEffect ", attribute);
    }
  }, [currentMetadataItem]);

  const modalplaceholderLabelValue = (metadatatype) => {
    if (metadatatype === "speaker") {
      return {
        placeHolderEnglish: "Speaker's Name (English)",
        placeHolderKannada: "Speaker's Name (Kannada)",
      };
    } else if (metadatatype === "member") {
      return {
        placeHolderEnglish: "Member's Name (English)",
        placeHolderKannada: "Member's Name (Kannada)",
      };
    } else {
      console.log("placehollder function metadatatype value", metadatatype);
    }
  };

  // const placeholderValue = placeholderLabelValue(attribute);
  //let { placeHolderEnglish, placeHolderKannada } = placeholderValue;

  //console.log("placeholderValue", placeholderValue);

  //let { placeHolderEnglish, placeHolderKannada } = placeholderValue;

  // const buttonValueSubmit = (metadataType) => {
  //   if (attribute === "speaker") {
  //     return "Speaker";
  //   } else if (attribute === "member") {
  //     return "Member";
  //   }
  // };

  //const buttonValueModal = buttonValueSubmit(attribute);

  const buttonValue = (currentMetadataItem, buttonLoading, attribute) => {
    if (currentMetadataItem && !buttonLoading) {
      return `Edit ${attribute}`;
    } else if (!currentMetadataItem && !buttonLoading) {
      return `Add ${attribute}`;
    } else if (currentMetadataItem && buttonLoading) {
      return `Editing ${attribute} ...`;
    } else if (!currentMetadataItem && buttonLoading) {
      return `Adding Speaker ...`;
    }
  };

  const optionsStatus = [
    { label: "Not-Live", value: false },
    { label: "Live", value: true },
  ];

  return (
    <Fragment>
      <div className="modal fade" id="addSpeaker-modal-metadata">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{modalTitle}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <TextFieldGroup
                  // placeholder={placeholderValue.placeHolderEnglish}
                  placeholder="Speaker'sName (English)"
                  name="name_eng"
                  value={currentItem.name_eng}
                  onChange={onChange}
                  error={false}
                  id="name_eng"
                  // labelText={placeholderValue.placeHolderEnglish}
                  labelText="Speaker'sName (English)"
                  formWidth="col-md"
                  required={true}
                />
              </div>
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Speaker's Name (Kannada)"
                name="name_kan"
                value={currentItem.name_kan}
                onChange={onChange}
                error={false}
                id="name_kan"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Speaker's Name (Kannada)"
                formWidth="col-md"
                required={true}
              />
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
              {currentItem.last_modified_time && (
                <TextFieldGroup
                  placeholder=""
                  name="lastModifiedAt"
                  value={currentItem.last_modified_time}
                  onChange={onChange}
                  // error={errors.last_modified_time}
                  id="lastmodifiedat"
                  labelText="Last Modified At"
                  formWidth="col-md"
                  disabled="true"
                />
              )}

              {currentItem.last_modified_time && (
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
              {currentItem.last_modified_time ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={onDelete}
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
                  //onClick={onDelete}
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
                onClick={AddSpeaker}
                data-dismiss="modal"
                //value={currentSpeaker ? "Edit Speaker" : "Add Speaker"}
                value={buttonValue(
                  currentMetadataItem,
                  buttonLoading,
                  "Speaker"
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

MetadataSectionModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  //speaker: PropTypes.object.isRequired,
  // currentSpeaker: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  AddSpeaker: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
  //  labelValues: PropTypes.object.isRequired,
};

export default MetadataSectionModal;
