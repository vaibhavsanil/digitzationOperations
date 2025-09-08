const jwt = require("jsonwebtoken");
//const config = require("config");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Import Mongoose Model
const Logs = require("../models/Logs");

module.exports = function (req, res, next) {
  // Get token from header
  let token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // console.log(` The value of the request header \n ${req}`);

  /// Username, IP, URL/Path,Method,req.protocol,x-auth Token,User Agent response time

  // Verify token
  try {
    function recoderHeaders(requ, resp, tokenValue) {
      const logParam = {};
      logParam.username = tokenValue.email;
      logParam.ip = requ.ip;
      logParam.path = requ.path;
      logParam.proto = requ.protocol;
      logParam.requestMethod = requ.method;
      logParam.tokenJWT = token;
      logParam.userAgent = requ.header("User-Agent");
      // logParam.responseTime = resp.header('x-response-time');

      return logParam;
    }

    const decoded = jwt.verify(token, keys.get("secretOrKey"));

    // console.log('[DEBUG] from auth js decoded value', decoded);

    req.user = decoded;

    const headerLog = recoderHeaders(req, res, decoded);

    const newLog = new Logs(headerLog);

    newLog
      .save()
      .then(() => {
        console.log(`Logs Saved for ${headerLog.username}`);
      })
      .catch((err) => {
        errors = {};
        errors.msg = "The logs cannot be inserted";
        errors.errType = err;
        res.status(400).json(errors);
      });

    // console.log(`The value of the headers is ${JSON.stringify(headerLog)}`);

    next();
  } catch (err) {
    //console.log("[DEBUG] from auth.js error is ", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
