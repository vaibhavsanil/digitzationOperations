module.exports = {
  CUSTOMER: "KLA",
  mongoURI: "mongodb://vaibhavsanil:Kalavathi5@ds363098.mlab.com:63098/kla-ops",
  mongoLocalURI: "mongodb://localhost/kla-ops",
  secretOrKey:
    "d7987a982fd354c5c9f9e7b0d7d8b9d2a1c3e5f7a8b9c1d2e3f4a5b6c7d8e9f0",
  mongoatlas:
    //"mongodb+srv://vaibhavsanil:Kalavathi5@kla-ops.kkm6g.mongodb.net/kla-ops?retryWrites=true&w=majority",
    "mongodb://vaibhavsanil:Kalavathi5@kla-ops-shard-00-00.kkm6g.mongodb.net:27017,kla-ops-shard-00-01.kkm6g.mongodb.net:27017,kla-ops-shard-00-02.kkm6g.mongodb.net:27017/kla-ops?ssl=true&replicaSet=atlas-129uy5-shard-0&authSource=admin&retryWrites=true&w=majority",
  localMongoURI_KLA_OPS_LOCAL: "127.0.0.1:27017",
  localMongoURI_KLA_OPS_PROD: "172.31.62.201",
  el_local: "http://localhost:9200",
  es_prod: "http://localhost:5000",
  es_user: "elastic",
  es_pass: "SiimsAdmin@123",
};
