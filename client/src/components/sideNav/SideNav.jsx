import React from "react";

import "./SidNav.styles.scss";

const SideNav = () => {
  return (
    <div className="sideNav-content">
      <div id="mySidenav" className="sidenav">
        <a
          href="#"
          id="addAnnexure"
          data-toggle="modal"
          data-target="#addAnnexure-modal-metadata"
        >
          Add Annexure
        </a>
        <a
          href="#"
          id="part1"
          data-toggle="modal"
          data-target="#addPart1-modal-metadata"
        >
          Add Part1(Q & A)
        </a>
        <a
          href="#"
          id="part2"
          data-toggle="modal"
          data-target="#addPart2-modal-metadata"
        >
          Add Part2 (Other than Q & A)
        </a>
        <a href="#" id="completed">
          Mark as Completed
        </a>
      </div>
    </div>
  );
};

export default SideNav;
