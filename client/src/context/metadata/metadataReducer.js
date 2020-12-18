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
  ADD_MEMBER,
  DELETE_MEMBER,
  DELETE_SPEAKER,
  GET_DEBATE_TITLE_ALL,
  DELETE_DEBATE_TITLE,
  DEBATE_TITLE_ERROR,
  GET_PORTFOLIO_ALL,
  DELETE_PORTFOLIO,
  PORTFOLIO_ERROR,
  ISSUES_ERROR,
  TAGS_ERROR,
  ADD_ISSUES,
  GET_ISSUES_ALL,
  DELETE_ISSUES,
  ADD_TAGS,
  GET_TAGS_ALL,
  DELETE_TAGS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    //Spekars Actions
    case GET_SPEAKER_ALL:
      return {
        ...state,
        speakersItems: [...action.payload],
      };
    case ADD_SPEAKER:
      return {
        ...state,
      };

    case DELETE_SPEAKER:
      console.log(
        `[DELETE SPEAKER] reducer called for action payload ${action.payload}`
      );
      return {
        ...state,
        speakersItems: state.speakersItems.filter(
          (speaker) => speaker._id !== action.payload
        ),
      };

    case GET_CURRENT_ITEM:
      return {
        ...state,
        currentMetadataItem: action.payload,
      };

    case SET_CURRENT_ITEM_NULL:
      return {
        ...state,
        currentMetadataItem: null,
      };

    case SPEAKER_ERROR:
    case GET_CURRENT_ITEM_ERROR:
    case MEMBER_ERROR:
    case DEBATE_TITLE_ERROR:
    case PORTFOLIO_ERROR:
    case ISSUES_ERROR:
    case TAGS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    //Member Actions
    case GET_MEMBER_ALL:
      return {
        ...state,
        debateParticipants: [...action.payload],
      };
    case DELETE_MEMBER:
      return {
        ...state,
        debateParticipants: state.debateParticipants.filter(
          (member) => member._id !== action.payload
        ),
      };

    //Debate Title Actions
    case GET_DEBATE_TITLE_ALL:
      return {
        ...state,
        debateTitles: [...action.payload],
      };
    case DELETE_DEBATE_TITLE:
      return {
        ...state,
        debateTitles: state.debateTitles.filter(
          (debatetitle) => debatetitle._id !== action.payload
        ),
      };

    // Portfolio Actions

    case GET_PORTFOLIO_ALL:
      return {
        ...state,
        portfolioItems: [...action.payload],
      };
    case DELETE_PORTFOLIO:
      return {
        ...state,
        portfolioItems: state.portfolioItems.filter(
          (portfolio) => portfolio._id !== action.payload
        ),
      };

    // Issues  Actions

    case GET_ISSUES_ALL:
      return {
        ...state,
        issuesItems: [...action.payload],
      };
    case DELETE_ISSUES:
      return {
        ...state,
        issuesItems: state.issuesItems.filter(
          (issues) => issues._id !== action.payload
        ),
      };

    // Tags  Actions

    case GET_TAGS_ALL:
      return {
        ...state,
        tagsItems: [...action.payload],
      };
    case DELETE_TAGS:
      return {
        ...state,
        tagsItems: state.tagsItems.filter(
          (tags) => tags._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
