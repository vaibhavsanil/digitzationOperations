const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const passport = require("passport");

//Imported Routes
const users = require("./routes/api/users");
const structbook = require("./routes/api/structbook");
const annexure = require("./routes/api/annexure");
const sectionalbook = require("./routes/api/sectionbook");
const addMember = require("./routes/api/addmember");
const metadata = require("./routes/api/metadata");
const app = express();

// Import Config file
////// types of ops KLA or KLC
/////// Indexing Parameters for KLA or KLC

// Body  Parser Middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json({ extended: false }));

mongoose.Promise = global.Promise;

//DB Config
//Check if the APP Variable connects to KLA or KLC
const db = require("./config/keys").mongoatlas;
console.log(db);

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Importing Passport middleware
//app.use(passport.initialize());

// Passport Config
//require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello Vidhan DocsTracker!!!"));

// Use Routes
app.use("/api/users", users); /// This route will be responsible for handling all the user related operation
app.use("/api/structbook", structbook); // This route will be responsible for handling structural metadata of the book
app.use("/api/annexure", annexure); // This route will be responsible for handling structural metadata of the book
app.use("/api/sectionbook", sectionalbook); // This route will be responsible for handling structural metadata of the book
app.use("/api/addmember", addMember); // This route will be responsible for handling structural metadata of the book
app.use("/api/metadata", metadata); // This route will be reponsible for all the mischallenous metadata crud operations
//app.use("/api/sectionbook", sectionbook); // This route will be responsible for handling sectional metadata of the book
//app.use("/api/metadata", metadata); // This route will be used for registering all metadata related operations

if (process.env.NODE_ENV === "production") {
  // https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
