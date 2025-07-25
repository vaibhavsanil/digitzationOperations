import React from "react";

export const modalplaceholderLabelValue = (metadatatype) => {
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

export const getStatusBadge = (status) => {
  if (status) {
    return <span className="badge badge-success">Live</span>;
  } else {
    return <span className="badge badge-danger">Not Live</span>;
  }
};
