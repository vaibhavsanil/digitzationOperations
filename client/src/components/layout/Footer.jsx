import React from "react";
import {
  LOGIN_CLASS_BODY,
  CUSTOMER_NAME_COLOUR,
  CUSTOMER,
} from "../../constants/index";

const Footer = () => {
  return (
    <footer class="main-footer">
      <strong>
        Copyright &copy; 2020-2021
        <a href="">
          Karnataka Legislative {CUSTOMER === "KLA" ? "Assembly" : "Council"}{" "}
          Secretariat
        </a>
        .
      </strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.2
      </div>
    </footer>
  );
};

export default Footer;
