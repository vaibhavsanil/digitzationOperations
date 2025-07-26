const SectionalMetadata = require("../models/SectionalMetadata");
const StructureBook = require("../models/StructureBook");
const es_mapping_json = require("../json_mapping_mongo.json");
const { Client } = require("@elastic/elasticsearch");
const keys = require("../config/keys");

const es_auth =
  process.env.NODE_ENV === "production"
    ? {
        node: "http://localhost:5000",
      }
    : {
        node: "http://localhost:9200",
        auth: {
          username: "elastic",
          password: "SiimsAdmin@123",
        },
      };

export function es_section_index(sectionData) {
  const client = new Client(es_auth);
  let es_section = {};
  let section_keys = Object.keys(es_mapping_json);
  section_keys.forEach((key_data) => {
    if (typeof es_mapping_json[key_data] === "string") {
      es_section.es_mapping_json[key_data] = sectionData[key_data];
    } else if (typeof es_mapping_json[key_data] === "object") {
    }
  });
  new Promise((resolve, reject) => {});
}
