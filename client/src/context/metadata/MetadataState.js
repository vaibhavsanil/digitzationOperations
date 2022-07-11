import React, { useReducer } from 'react';
import axios from 'axios';

import MetadataContext from './metadataContext';
import metadataReducer from './metadataReducer';

import {
  ADD_SPEAKER,
  SPEAKER_ERROR,
  GET_SPEAKER_ALL,
  CLEAR_ERRORS,
  GET_CURRENT_ITEM,
  GET_CURRENT_ITEM_ERROR,
  SET_CURRENT_ITEM_NULL,
  GET_MEMBER_ALL,
  MEMBER_ERROR,
} from '../types';

const MetadataState = (props) => {
  const initialState = {
    // speakersItems: [
    //   {
    //     nameEnglish: "Kagodu Thimmappa",
    //     nameKannada: "ಕಾಗೋಡು ತಿಮ್ಮಪ್ಪ",
    //     status: true,
    //     id: 1,
    //     lastModifiedAt: "2016-08-02 11:28:56",
    //     lastModifiedBy: "Vaibhav Sanil",
    //   },
    //   {
    //     nameEnglish: "Vishveshwar Hegde Kageri",
    //     nameKannada: "ವಿಶ್ವೇಶ್ವರ ಹೆಗಡೆ ಕಾಗೇರಿ",
    //     status: true,
    //     id: 2,
    //     lastModifiedAt: "2016-08-02 11:28:56",
    //     lastModifiedBy: "Vaibhav Sanil",
    //   },
    //   {
    //     nameEnglish: "Vaibhav Sanil",
    //     nameKannada: "ವೈಭವ್ ಸನಿಲ್",
    //     status: false,
    //     id: 3,
    //     lastModifiedAt: "2016-08-02 11:28:56",
    //     lastModifiedBy: "Vaibhav Sanil",
    //   },
    //   {
    //     nameEnglish: "Madhavraj A",
    //     nameKannada: "ಮಾಧವರಾಜ್",
    //     status: false,

    //     id: 4,
    //     lastModifiedAt: "2016-08-02 11:28:56",
    //     lastModifiedBy: "Vaibhav Sanil",
    //   },
    // ],
    speakersItems: [],
    currentSpeaker: null,
    debateParticipants: [],
    debateTitles: [],
    portfolioItems: [],
    issuesItems: [],
    tagsItems: [],
    currentDebateParticipants: null,
    loading: false,
    currentMetadataItem: null,

    errors: {},
    alerts: [],
  };

  const [state, dispatch] = useReducer(metadataReducer, initialState);

  //////////////////////////////   Actions //////////////////////////////////////

  /******************************** SPEAKER ACTIONS *****************************/

  const clearErrors = async () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // Get Speaker Item

  //Get Speaker Items
  const getSpeakerItems = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get('/api/metadata/speaker/all', config);

      dispatch({ type: GET_SPEAKER_ALL, payload: res.data });
    } catch (error) {
      dispatch({
        type: SPEAKER_ERROR,
        payload: error.response.speakerName,
      });
    }
  };

  // Add Speaker
  const addSpeaker = async (speaker) => {
    //setCurrentItemToNull();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        '/api/metadata/speaker/new',
        speaker,
        config
      );
      getSpeakerItems();
      return res.data.msg;
    } catch (error) {
      dispatch({
        type: SPEAKER_ERROR,
        payload: error.response.data.speakerName,
      });
      return error;
    }
  };

  // //    EDIT  ITEM General Prurpose Function
  // const editItem = async (id, metadataType) => {
  //   console.log(`/api/metadata/${metadataType}/${id}/get`);
  //   //Set the current speaker item to the current speaker item
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     const res = await axios.get(
  //       `/api/metadata/${metadataType}/${id}/get`,
  //       config
  //     );
  //     console.log(res.data);
  //     dispatch({
  //       type: GET_CURRENT_ITEM,
  //       payload: res.data,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     // console.log("Error Object editItem Action", error.response);
  //     dispatch({
  //       type: GET_CURRENT_ITEM_ERROR,
  //       payload: error.response.data.speakerName,
  //     });
  //     return error;
  //   }
  // };
  // https://medium.com/javascript-in-plain-english/you-definitely-should-be-using-suspense-in-react-code-splitting-and-preloading-b9cbe393a95
  //https://stackoverflow.com/questions/57221878/react-classname-naming-convention

  /******************************** DEBATE PARTICIPANT ACTIONS *****************************/

  //Get Speaker Items
  const getItems = async (
    metadataType,
    dispatchType,
    dispatchError,
    errorName
  ) => {
    // /////// MEMBER //////
    // cases GET_MEMBER_ALL
    // case ERROR MEMEBER_ERROR
    // errorName = memberName
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const getDispatchType = (metadatatype) => {
    //   if (metadatatype === "member") return GET_MEMBER_ALL;
    // };

    try {
      const res = await axios.get(`/api/metadata/${metadataType}/all`, config);

      dispatch({ type: dispatchType, payload: res.data });
    } catch (error) {
      dispatch({
        type: dispatchError,
        // payload: error.response.data[`${errorName}`],
        payload: error.response,
      });
    }
  };

  // General Add Item Actions
  const addItem = async (
    addItemFromObject,
    metadataType,
    getTypeReducer, //Call for type in get Action
    //errorTypeReducer, // Call for Error type in get aC

    dispatchError,
    errorName
  ) => {
    //setCurrentItemToNull();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `/api/metadata/${metadataType}/new`,
        addItemFromObject,
        config
      );

      if (metadataType === 'member') {
        getItems(metadataType, getTypeReducer, dispatchError, 'memberName');
      } else if (metadataType === 'debatetitle') {
        getItems(metadataType, getTypeReducer, dispatchError, 'debateTitle');
      } else if (metadataType === 'portfolio') {
        getItems(metadataType, getTypeReducer, dispatchError, errorName);
      } else if (metadataType === 'issues') {
        getItems(metadataType, getTypeReducer, dispatchError, errorName);
      } else if (metadataType === 'tags') {
        getItems(metadataType, getTypeReducer, dispatchError, errorName);
      }

      return res.data.msg;
    } catch (error) {
      dispatch({
        type: dispatchError,
        payload: error.response.data[`${errorName}`],
      });
      return error;
    }
  };

  //    EDIT  ITEM General Prurpose Function
  const editItem = async (
    id,
    metadataType,

    errorName
  ) => {
    // console.log(`/api/metadata/${metadataType}/${id}/get`);
    //Set the current speaker item to the current speaker item
    setCurrentItemToNull();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `/api/metadata/${metadataType}/${id}/get`,
        config
      );
      dispatch({
        type: GET_CURRENT_ITEM,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      // console.log("Error Object editItem Action", error.response);
      dispatch({
        type: GET_CURRENT_ITEM_ERROR,
        payload: error.response.data[`${errorName}`],
      });
      return error;
    }
  };

  //    Delete  ITEM General Prurpose Function
  const deleteItem = async (
    id,
    metadataType,
    dispatchType,
    dispatchError,
    errorName
  ) => {
    console.log(
      `[DEBUG -DeleteDebateTitle] the value of metadata type is ${metadataType}`
    );
    console.log(`[DEBUG DELETE ITEM] /api/metadata/${metadataType}/${id}`);
    //Set the current speaker item to the current speaker item

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(
        `/api/metadata/${metadataType}/${id}`,
        config
      );

      console.log(`[DELETE ITEM] the value of res ${res.data}`);
      console.log(`[DELETE ITEM] the dispatch type is ${dispatchType}`);

      dispatch({
        type: dispatchType,
        payload: id,
      });
      return res.data;
    } catch (error) {
      // console.log("Error Object editItem Action", error.response);
      dispatch({
        type: dispatchError,
        payload: error.response.data[`${errorName}`],
      });
      return error;
    }
  };

  // Set Current Item to Null
  const setCurrentItemToNull = () => {
    dispatch({ type: SET_CURRENT_ITEM_NULL });
  };

  return (
    <MetadataContext.Provider
      value={{
        speakersItems: state.speakersItems,
        currentSpeaker: state.currentSpeaker,
        debateParticipants: state.debateParticipants,
        currentDebateParticipants: state.currentDebateParticipants,
        loading: state.loading,
        errors: state.errors,
        alerts: state.alerts,
        currentMetadataItem: state.currentMetadataItem,
        debateTitles: state.debateTitles,
        portfolioItems: state.portfolioItems,
        issuesItems: state.issuesItems,
        tagsItems: state.tagsItems,

        addSpeaker,
        getSpeakerItems,
        clearErrors,
        editItem,
        setCurrentItemToNull,
        deleteItem,
        addItem,
        getItems,
      }}
    >
      {props.children}
    </MetadataContext.Provider>
  );
};

export default MetadataState;
