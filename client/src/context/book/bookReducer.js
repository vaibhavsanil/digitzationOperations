import {
  ADD_BOOK_STRUCT,
  DELETE_BOOK_STRUCT,
  CLEAR_BOOK,
  GET_BOOK_STRUCT_ALL,
  GET_CURRENT_BOOK_STRUCTURE,
  BOOK_STRUCT_ERROR,
  GET_CURRENT_BOOK_STRUCTURE_ERROR,
  GET_ANNEXURE_FOR_BOOK,
  ANNEXURE_ERROR,
  DELETE_ANNEXURE_ID,
  GET_CURRENT_ANNEXURE,
  CLEAR_CURRENT_ANNEXURE,
  CLEAR_CURRENT_METADATA_SECTION,
  METADATA_ERROR,
  GET_METADATA_FOR_BOOK,
  DELETE_METADATA_ID,
  GET_CURRENT_METADATA,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOK_STRUCT_ALL:
      return {
        ...state,
        //Change this after refactoring
        bookSummaryTable: [...action.payload],
      };

    case GET_CURRENT_BOOK_STRUCTURE:
      return {
        ...state,
        currentBookStructure: action.payload,
      };

    // Error
    case BOOK_STRUCT_ERROR:
    case GET_CURRENT_BOOK_STRUCTURE_ERROR:
    case ANNEXURE_ERROR:
    case METADATA_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case GET_ANNEXURE_FOR_BOOK:
      return {
        ...state,
        annexureItems: [...action.payload],
      };

    case DELETE_ANNEXURE_ID:
      return {
        ...state,
        annexureItems: state.annexureItems.filter(
          (annexure) => annexure._id !== action.payload
        ),
      };

    case GET_CURRENT_ANNEXURE:
      return {
        ...state,
        currentAnnexure: action.payload[0],
      };

    case CLEAR_CURRENT_ANNEXURE:
      return {
        ...state,
        currentAnnexure: {},
      };

    // Metadata Section Action

    case CLEAR_CURRENT_METADATA_SECTION:
      return {
        ...state,
        currentMetadata: {},
      };

    case GET_METADATA_FOR_BOOK:
      return {
        ...state,
        sectionalMetadataItems: [...action.payload],
      };

    case DELETE_METADATA_ID:
      return {
        ...state,
        sectionalMetadataItems: state.sectionalMetadataItems.filter(
          (sectionmetadata) => sectionmetadata._id !== action.payload
        ),
      };

    case GET_CURRENT_METADATA:
      return {
        ...state,
        currentMetadata: action.payload,
      };

    default:
      return state;
  }
};
