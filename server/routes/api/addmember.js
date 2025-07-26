const express = require("express");
const router = express.Router();

//const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation

//Load User Model

//const SectionalMetadata = require("../../models/SectionalMetadata");
//const StructureBook = require("../../models/StructureBook");
const MemberParticipants = require("../../models/MemberParticipant");

// @route GET /api/structbook/test
// @desc  Tests structure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "ADD Member Test" }));

// @route POST /api/addmember/new
// @desc  To Add & Edit Members from the Database
// @access Private

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const memberFields = {}; // Create an Object

    if (req.user._id) bookFields.modified_user = req.user._id; // Remove this after adding the authentication
    if (req.body.memberid) memberFields.memberid = req.body.memberid;
    memberFields.member_name_eng = req.body.member_name_eng;
    memberFields.member_name_kan = req.body.member_name_kan;

    // Save in the Database
    MemberParticipants.findOne({ _id: req.body.memberid }).then((member) => {
      if (member) {
        //Update the Contents
        MemberParticipants.findOneAndUpdate(
          { _id: req.body.memberid },
          { $set: memberFields },
          { new: true }
        )
          .then((member) => res.json(member))
          .catch((err) => res.status(400).json(err));
      } else {
        //Create the New Book Structure
        new StructureBook(bookFields)
          .save()
          .then((structbook) => res.status(200).json(structbook));
        // TODO create folders in the static folder with the said book id
        // TODO Call Python script to listent to these folders
      }
    });
  }
);

// @route GET /api/addmember/
// @desc  To get all members in the List
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    MemberParticipants.find({})
      .then((members) => {
        if (members) {
          //Update the Contents
          res.status(200).json(members);
        } else {
          //Create the New Book Structure
          errors.addmember =
            "There are no Members in the Database ,Please add one!!!";
          res.status(404).json(errors);
        }
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route GET /api/addmember/:memberId
// @desc  To get all members in the List
// @access Private

router.get(
  "/:memberId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    MemberParticipants.deleteOne({ _id: req.params.id })
      .then((member) => {
        if (!members) {
          //Update the
          errors.addmember = "The particular Member ID Dont Exists !!";
          res.status(404).json(addmember);
        } else {
          res.status(200).json({ msg: "Success" });
        }
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
