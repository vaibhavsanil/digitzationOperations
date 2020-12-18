import React, { useEffect, useContext } from "react";

import BreadCrumbs from "../../utils/Breadcrumbs";
import MetadataSpeakerSection from "./metadatasections/MetadataSpeakersCard.component";
import MetadataParticipantsSection from "./metadatasections/MetadataParticiapantsCard.component";
import MetadataDebateTitleCard from "./metadatasections/MetadataDebateTitleCard.component";
import MetadataPortfolioCard from "./metadatasections/MetadataPortfoliosCard.component";
import MetadataIssuesCard from "./metadatasections/MetadataIssuesCard.component";
import MetadataTagsCard from "./metadatasections/MetadataTagsCard";

import {
  GET_MEMBER_ALL,
  MEMBER_ERROR,
  GET_DEBATE_TITLE_ALL,
  DEBATE_TITLE_ERROR,
  GET_PORTFOLIO_ALL,
  PORTFOLIO_ERROR,
  GET_ISSUES_ALL,
  ISSUES_ERROR,
  GET_TAGS_ALL,
  TAGS_ERROR,
} from "../../context/types";

import MetadataContext from "../../context/metadata/metadataContext";
import AuthContext from "../../context/auth/authContext";

const MetadataIndex = () => {
  const metadataContext = useContext(MetadataContext);
  const authContext = useContext(AuthContext);

  const {
    getSpeakerItems,
    getItems,
    speakersItems,
    debateParticipants,
  } = metadataContext;

  useEffect(() => {
    getSpeakerItems();
    getItems("member", GET_MEMBER_ALL, MEMBER_ERROR, "memberName");
    getItems(
      "debatetitle",
      GET_DEBATE_TITLE_ALL,
      DEBATE_TITLE_ERROR,
      "debateTitle"
    );
    //Get Ministry Portfolio
    getItems(
      "portfolio",
      GET_PORTFOLIO_ALL,
      PORTFOLIO_ERROR,
      "portfolioMinistry"
    );
    //Get Issues
    getItems("issues", GET_ISSUES_ALL, ISSUES_ERROR, "issuesFields");

    // Get Tags
    getItems("tags", GET_TAGS_ALL, TAGS_ERROR, "tagsFields");
  }, []);

  return (
    <div className="content-wrapper">
      <BreadCrumbs />
      <MetadataSpeakerSection />
      <MetadataParticipantsSection />
      <MetadataDebateTitleCard />
      <MetadataPortfolioCard />
      <MetadataIssuesCard />
      <MetadataTagsCard />
    </div>
  );
};

export default MetadataIndex;
