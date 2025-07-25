import React, { useEffect, useContext, Fragment } from "react";
import swal from "sweetalert";

import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";

import BookContext from "../../../context/book/bookContext";

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
  modalLabelNames,
  modalname,

  //  labelValues,
}) => {
  const bookContext = useContext(BookContext);

  const {
    currentAnnexure,
    clearcurrentAnnexure,
    currentBookStructure,
  } = bookContext;

  const { buttonLoading, isModalOpen } = loading;

  useEffect(() => {
    if (
      Object.keys(currentAnnexure).length === 0 &&
      currentAnnexure.constructor === Object
    ) {
      setCurrentItem({
        _id: null,
        book_id_num: null,
        annexure_title: null,
        start_page: null,
        end_page: null,
        status: null,

        last_modified_time: null,
        modified_user: null,
      });
    } else {
      setCurrentItem(currentAnnexure);
    }
  }, [currentAnnexure]);

  const buttonValue = (currentannexure, attribute) => {
    if (!(Object.keys(currentannexure).length === 0)) {
      return `Edit ${attribute}`;
    } else if (Object.keys(currentannexure).length === 0) {
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

  return (
    <Fragment>
      <div className="modal fade" id="addAnnexure-modal-metadata">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{modalTitle}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => clearcurrentAnnexure()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <TextFieldGroup
                  // placeholder={placeholderValue.placeHolderEnglish}
                  placeholder="Book Id"
                  name="bookId"
                  value={currentBookStructure.bookId}
                  onChange={onChange}
                  error={false}
                  id="bookId"
                  // labelText={placeholderValue.placeHolderEnglish}
                  labelText="Book ID"
                  formWidth="col-md"
                  required={true}
                  disabled="true"
                />
              </div>
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Annexure Title"
                name="annexure_title"
                value={currentItem.annexure_title}
                onChange={onChange}
                error={false}
                id="annexure_title"
                //labelText={placeholderValue.placeHolderKannada}
                labelText="Annexure Title"
                formWidth="col-md"
                required={true}
              />
              <TextFieldGroup
                //placeholder={placeholderValue.placeHolderKannada}
                placeholder="Start Page"
                name="start_page"
                value={currentItem.start_page}
                onChange={onChange}
                error={false}
                id="start_page"
                //labelText={placeholderValue.placeHolderKannada}
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
                onClick={AddItem}
                data-dismiss="modal"
                //value={currentSpeaker ? "Edit Speaker" : "Add Speaker"}
                value={buttonValue(
                  currentAnnexure,
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

MetadataSectionModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  //speaker: PropTypes.object.isRequired,
  // currentSpeaker: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  AddItem: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
  modalLabelNames: PropTypes.object.isRequired,
  //  labelValues: PropTypes.object.isRequired,
};

export default MetadataSectionModal;
