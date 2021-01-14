module.exports = {
  CUSTOMER: "KLA",
  mongoURI: "mongodb://vaibhavsanil:Kalavathi5@ds363098.mlab.com:63098/kla-ops",
  mongoLocalURI: "mongodb://localhost/kla-ops",
  secretOrKey: "secret",
  mongoatlas:
    //"mongodb+srv://vaibhavsanil:Kalavathi5@kla-ops.kkm6g.mongodb.net/kla-ops?retryWrites=true&w=majority",
    "mongodb://vaibhavsanil:Kalavathi5@kla-ops-shard-00-00.kkm6g.mongodb.net:27017,kla-ops-shard-00-01.kkm6g.mongodb.net:27017,kla-ops-shard-00-02.kkm6g.mongodb.net:27017/kla-ops?ssl=true&replicaSet=atlas-129uy5-shard-0&authSource=admin&retryWrites=true&w=majority",
  localMongoURI_KLA_OPS: "mongodb://127.0.0.1:27017/kla_ops_prod",
  localMongoURI_KLC_OPS: "mongodb://127.0.0.1:27017/klc_ops_prod",
};
