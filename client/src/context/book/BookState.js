import React, { useReducer } from "react";
import axios from "axios";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";

import {
  ADD_BOOK_STRUCT,
  DELETE_BOOK_STRUCT,
  CLEAR_BOOK,
  GET_BOOK_STRUCT_ALL,
  BOOK_STRUCT_ERROR,
  GET_CURRENT_BOOK_STRUCTURE,
  GET_CURRENT_BOOK_STRUCTURE_ERROR,
  GET_ANNEXURE_FOR_BOOK,
  ANNEXURE_ERROR,
  DELETE_ANNEXURE_ID,
  GET_CURRENT_ANNEXURE,
  CLEAR_CURRENT_ANNEXURE,
  GET_METADATA_FOR_BOOK,
  METADATA_ERROR,
  DELETE_METADATA_ID,
  GET_CURRENT_METADATA,
  CLEAR_CURRENT_METADATA_SECTION,
} from "../types";

const BookState = (props) => {
  const initialState = {
    // bookSummaryTable: [
    //   {
    //     bookId: 1,
    //     assemblyNumber: 13,
    //     sessionNumber: 12,
    //     pageCount: 134,
    //     sectionCount: 145,
    //     status: "Book Created",
    //     bindingStatus: "Unbinded",
    //   },
    //   {
    //     bookId: 2,
    //     assemblyNumber: 13,
    //     sessionNumber: 14,
    //     pageCount: 134,
    //     sectionCount: 144,
    //     status: "Metadata Completed",
    //     bindingStatus: "Binded",
    //   },
    //   {
    //     bookId: 3,
    //     assemblyNumber: 13,
    //     sessionNumber: 12,
    //     pageCount: 185,
    //     sectionCount: 165,
    //     status: "OCR Process",
    //     bindingStatus: "Binded",
    //   },
    //   {
    //     bookId: 4,
    //     assemblyNumber: 13,
    //     sessionNumber: 12,
    //     pageCount: 185,
    //     sectionCount: 132,
    //     status: "Indexing",
    //     bindingStatus: "Unbinded",
    //   },
    //   {
    //     bookId: 5,
    //     assemblyNumber: 13,
    //     sessionNumber: 12,
    //     pageCount: 146,
    //     sectionCount: 175,
    //     status: "Book Live",
    //     bindingStatus: "Unbinded",
    //   },
    //   {
    //     bookId: 6,
    //     assemblyNumber: 13,
    //     sessionNumber: 12,
    //     pageCount: 146,
    //     sectionCount: 175,
    //     status: "Book Error",
    //     bindingStatus: "Unbinded",
    //   },
    // ],

    bookSummaryTable: [],

    uploadfilePath: "",
    currentBookStructure: [],
    loading: false,
    // annexureItems: [  {
    //   AnnexureId: 1,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 2,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 3,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 4,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 5,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 6,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },
    // {
    //   AnnexureId: 7,
    //   SessionNumber: "3[2009]",
    //   BookId: 11,
    //   StartPage: 441,
    //   EndPage: 442,
    //   Title: "2009-10ನೇ ಸಾಲಿನ ಬೇಡಿಕೆಗಳ ಮಂಡನೆ",
    // },],
    annexureItems: [],
    sectionalMetadataItems: [],
    currentMetadata: {},
    currentAnnexure: {},

    errors: {},
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  //get Book Struct

  const getBookStruct = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const getDispatchType = (metadatatype) => {
    //   if (metadatatype === "member") return GET_MEMBER_ALL;
    // };

    try {
      const res = await axios.get("/api/structbook/all", config);

      // console.log("[DEBUG-GETBOOK] ", res);

      dispatch({ type: GET_BOOK_STRUCT_ALL, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({
        type: BOOK_STRUCT_ERROR,
        payload: error.response.data.addbookStruct,
      });
      return error;
    }
  };

  // Add Book Structure

  const addBookStruct = async (bookStruct) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const getDispatchType = (metadatatype) => {
    //   if (metadatatype === "member") return GET_MEMBER_ALL;
    // };

    try {
      const res = await axios.post("/api/structbook/new", bookStruct, config);

      getBookStruct();
      return res.data.msg;
    } catch (error) {
      dispatch({
        type: BOOK_STRUCT_ERROR,
        payload: error.response.data.addbookStruct,
      });
      return error;
    }
  };

  // Delete Book Structure

  const deleteBookStruct = (id) => {
    // Call the url with book structures Object
    dispatch({
      type: DELETE_BOOK_STRUCT,
      payload: id,
    });
  };

  const deleteItem = (bookId) => {};

  // Re Index Book

  const reIndexBook = (bookId) => {};

  //  get Current book Item in currentBookStructure

  const getCurrentBook = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/structbook/${id}`, config);

      dispatch({
        type: GET_CURRENT_BOOK_STRUCTURE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CURRENT_BOOK_STRUCTURE_ERROR,
        payload: error.response.data.structbook,
      });
    }
  };

  // Annexure Actions //
  const clearcurrentAnnexure = () => {
    dispatch({
      type: CLEAR_CURRENT_ANNEXURE,
    });
  };

  const getAnnexureItems = async (bookId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/annexure/new/${bookId}`, config);

      dispatch({
        type: GET_ANNEXURE_FOR_BOOK,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ANNEXURE_ERROR,
        payload: error.response.data.annexure,
      });
    }
  };
  // Adding/Editing  Annexure
  const addAnnexure = async (annexure, bookId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const getDispatchType = (metadatatype) => {
    //   if (metadatatype === "member") return GET_MEMBER_ALL;
    // };

    try {
      const res = await axios.post(
        `/api/annexure/new/${bookId}`,
        annexure,
        config
      );

      getAnnexureItems(bookId);
      //Clear the current Annexure
      clearcurrentAnnexure();
      return res.data.msg;
    } catch (error) {
      clearcurrentAnnexure();

      dispatch({
        type: ANNEXURE_ERROR,
        payload: error.response.data.annexure,
      });
      return error;
    }
  };

  const editAnnexure = async (annexureId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/annexure/${annexureId}`, config);

      //getBookStruct();
      dispatch({
        type: GET_CURRENT_ANNEXURE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ANNEXURE_ERROR,
        payload: error.response.data.annexure,
      });
      return error;
    }
  };

  const deleteAnnexure = async (annexureid, bookid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/annexure/${bookid}/${annexureid}`,
        config
      );
      dispatch({
        type: DELETE_ANNEXURE_ID,
        payload: annexureid,
      });

      return res.data.msg;
    } catch (error) {
      dispatch({
        type: ANNEXURE_ERROR,
        payload: error.response.data.annexure,
      });

      return error.response;
    }
  };

  //////////////////////////// Sectional Metadata Actions  //////////////////////

  // const clearcurrentMetadata = () => {
  //   dispatch({
  //     type: CLEAR_CURRENT_METADATA,
  //   });
  // };

  const getMetadataItems = async (bookId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // console.info("[DEBUG] from getMetadataItems value of bookid", bookId);

    try {
      const res = await axios.get(`/api/sectionbook/get/${bookId}`, config);
      // console.log("[DEBUG] get MetDataItem ", res.data);
      dispatch({
        type: GET_METADATA_FOR_BOOK,
        payload: res.data,
      });
    } catch (error) {
      console.info("[DEBUG ERROR] get MetDataItem  error", error);
      dispatch({
        type: METADATA_ERROR,
        payload: error.response.data.sectionalbook,
      });
    }
  };
  // Adding/Editing  Sectional Metadata
  const addSection = async (section, bookId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //console.info("[DEBUG] Current Added Section", section);

    try {
      const res = await axios.post(`/api/sectionbook/new`, section, config);

      getMetadataItems(section.book_id);
      //Clear the current Annexure
      clearcurrentMetadataSection();
      return res.data.msg;
    } catch (error) {
      clearcurrentMetadataSection();

      dispatch({
        type: METADATA_ERROR,
        payload: error.response.data.sectionalbook,
      });
      return error;
    }
  };
  const clearcurrentMetadataSection = () => {
    dispatch({
      type: CLEAR_CURRENT_METADATA_SECTION,
    });
  };
  const editSection = async (sectionId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sectionbook/${sectionId}`, config);

      //getBookStruct();
      dispatch({
        type: GET_CURRENT_METADATA,
        payload: res.data,
      });
    } catch (error) {
      //console.info("[DEBUG Edit Section Book State] ", error);
      dispatch({
        type: METADATA_ERROR,
        payload: error.response.data.sectionalbook,
      });
      return error;
    }
  };

  const deleteSection = async (bookid, sectionid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/sectionbook/${bookid}/${sectionid}`,
        config
      );
      dispatch({
        type: DELETE_METADATA_ID,
        payload: sectionid,
      });

      return res.data.msg;
    } catch (error) {
      dispatch({
        type: METADATA_ERROR,
        payload: error.response.data.sectionalbook,
      });

      return error.response;
    }
  };

  return (
    <BookContext.Provider
      value={{
        bookSummaryTable: state.bookSummaryTable,

        uploadfilePath: state.uploadfilePath,

        loading: state.loading,

        errors: state.errors,
        currentBookStructure: state.currentBookStructure,
        currentAnnexure: state.currentAnnexure,
        annexureItems: state.annexureItems,
        sectionalMetadataItems: state.sectionalMetadataItems,
        currentMetadata: state.currentMetadata,

        addBookStruct,
        deleteItem,
        reIndexBook,
        getBookStruct,
        getCurrentBook,
        getAnnexureItems,
        addAnnexure,
        editAnnexure,
        deleteAnnexure,
        clearcurrentAnnexure,
        getMetadataItems,
        editSection,
        deleteSection,
        addSection,
        clearcurrentMetadataSection,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
