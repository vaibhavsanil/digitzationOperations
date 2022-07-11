import React, { useEffect, useContext, useState, Fragment } from 'react';
//import swal from "sweetalert";

import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import SelectListGroup from '../../components/common/SelectListGroup';

import MetadataContext from '../../context/metadata/metadataContext';
import AlertContext from '../../context/alert/alertContext';

const MetadataSectionModal = ({
  modalTitle,
  speaker,
  // setSpeaker,
  setCurrentItem,
  loading,
  setLoading,
  AddItem,
  onChange,
  currentItem,
  onDelete,
  attribute,
  setCurrentItemsNull,
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

  useEffect(() => {}, []);

  const modalplaceholderLabelValue = (metadatatype) => {
    if (metadatatype === 'speaker') {
      return {
        placeHolderEnglish: "Speaker's Name (English)",
        placeHolderKannada: "Speaker's Name (Kannada)",
      };
    } else if (metadatatype === 'member') {
      return {
        placeHolderEnglish: "Member's Name (English)",
        placeHolderKannada: "Member's Name (Kannada)",
      };
    } else {
      console.log('placehollder function metadatatype value', metadatatype);
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
    { label: 'Metadata', value: false },
    { label: 'Admin', value: true },
  ];

  return (
    <Fragment>
      <div className="modal fade" id="admin-modal-metadata">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{modalTitle}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setCurrentItemsNull}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <TextFieldGroup
                  // placeholder={placeholderValue.placeHolderEnglish}
                  placeholder="Name of the user"
                  name="name"
                  onChange={onChange}
                  error={false}
                  id="name"
                  // labelText={placeholderValue.placeHolderEnglish}
                  labelText="Name of the User"
                  formWidth="col-md"
                  required={true}
                />
              </div>
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Enter the email"
                name="email"
                onChange={onChange}
                error={false}
                id="email"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Email"
                formWidth="col-md"
                required={true}
              />
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="password"
                name="password"
                onChange={onChange}
                error={false}
                id="password"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Enter Password"
                formWidth="col-md"
                required={true}
                type="password"
              />
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Password"
                name="password1"
                onChange={onChange}
                error={false}
                id="password1"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Re Enter Password"
                formWidth="col-md"
                required={true}
                type="password"
              />
              <SelectListGroup
                placeholder="Admin Status"
                name="admin_status"
                value="false"
                onChange={onChange}
                error={false}
                id="admin_status"
                labelText="Admin Status"
                formWidth="col-6"
                options={optionsStatus}
              />
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Enter Phonenumber"
                name="phonenumber"
                onChange={onChange}
                error={false}
                id="phonenumber"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Phone Number"
                formWidth="col-md"
                required={true}
              />
            </div>
            <div className="justify-content-between">
              <input
                type="submit"
                className={
                  buttonLoading
                    ? 'btn btn-primary disabled'
                    : 'btn btn-primary '
                }
                onClick={AddItem}
                data-dismiss="modal"
                //value={currentSpeaker ? "Edit Speaker" : "Add Speaker"}
                value="Submit"
                style={{
                  float: 'right',
                  margin: '10px',
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

// MetadataSectionModal.propTypes = {
//   modalTitle: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   //speaker: PropTypes.object.isRequired,
//   // currentSpeaker: PropTypes.object.isRequired,
//   loading: PropTypes.object.isRequired,
//   setLoading: PropTypes.func.isRequired,
//   AddItem: PropTypes.func.isRequired,
//   setCurrentItem: PropTypes.func.isRequired,
//   currentItem: PropTypes.object.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   attribute: PropTypes.string.isRequired,
//   //  labelValues: PropTypes.object.isRequired,
// };

export default MetadataSectionModal;
