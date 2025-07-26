const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  proto: {
    type: String,
  },
  requestMethod: {
    type: String,
  },
  tokenJWT: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  responseTime: {
    type: String,
  },
  logDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Logs = mongoose.model('logsSchema', LogsSchema);
