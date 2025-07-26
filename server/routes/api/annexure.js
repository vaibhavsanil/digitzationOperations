const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const keys = require("../../config/keys");
//const passport = require("passport");

//Load Input Validation

////const validateRegisterInput = require("../../validations/register");
////const validateLoginInput = require("../../validations/login");

//Load Annexure Model

const Annexure = require("../../models/Annexure");
const StructureBook = require("../../models/StructureBook");
// @route GET /api/annexure/test
// @desc  Tests Annexure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Structure Book Test" }));

// @route GET /api/annexure/new
// @desc  Creates & Updates the Annexure Model/:bookId
// @access Protected

router.post(
  "/new/:bookId",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const annexureFields = {}; // Create an Object
    if (req.body._id) annexureFields._id = req.body._id;
    annexureFields.book_id_num = req.params.bookId;
    if (req.user.id) annexureFields.modified_user = req.user.id; // Remove this after adding the authentication
    //annexureFields.bookId = req.params.bookId;
    annexureFields.annexure_title = req.body.annexure_title;
    annexureFields.start_page = req.body.start_page;
    annexureFields.end_page = req.body.end_page;

    // Save in the Database
    Annexure.findOne({ _id: req.body._id }).then((annexure) => {
      if (annexure) {
        //Update the Contents
        Annexure.findOneAndUpdate(
          { _id: req.body._id },
          { $set: annexureFields },
          { new: true }
        )
          .then((annexure) => {
            // Setting the id for annexure in Strucutre Book

            res.status(200).json({ msg: "success" });
          })
          .catch((err) => res.status(400).json(err));
      } else {
        //Create the New Book Structure
        new Annexure(annexureFields)
          .save()
          .then((annex) => {
            StructureBook.findOneAndUpdate(
              { bookId: req.params.bookId },
              {
                $push: {
                  annexure: annex._id,
                },
              },
              { new: true }
            )
              .then((structBook) => {
                //  console.log("[DEBUG] the updated structure book ", structBook);
                //res.status(200).json((msg: "success"));
              })
              .catch((err) => res.status(400).json(err));
            res.status(200).json({ msg: "success" });
          })
          .catch((err) => res.status(400).json(err));

        // TODO create folders in the static folder with the said book id
        // TODO Call Python script to listent to these folders
      }
    });
  }
);

// @route GET /api/annexure/:annexureId
// @desc  Gets the details of a particular Annexere
// @access Protected

router.get(
  "/:annexureId",
  // passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    Annexure.find({ _id: req.params.annexureId }).then((annexure) => {
      if (annexure) {
        res.status(200).json(annexure);
      } else {
        errors.annexure = "This Annexure ID not found !!!";
        res.status(404).json(errors);
      }
    });
  }
);

// @route GET /api/annexure/:bookId
// @desc  Gets the details of all annexure fir  particular bookid
// @access Protected

router.get(
  "/new/:bookId",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    Annexure.find({ book_id_num: req.params.bookId }).then((annexure) => {
      if (annexure) {
        res.status(200).json(annexure);
      } else {
        errors.annexure = "This BookId ID Annexures not found !!!";
        res.status(404).json(errors);
      }
    });
  }
);

// @route DELETE /api/annexure/:bookId
// @desc  Delete all annexure for  particular bookid
// @access Protected
router.delete(
  "/:bookId",
  auth,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    Annexure.deleteMany({ book_id_num: req.params.bookId }).then((annexure) => {
      if (annexure) {
        //TODO Structure Metadata Model we have to delete one more id from Annexure ID
        res.status(200).json(annexure);
      } else {
        errors.annexure = "This Annexures not found !!!";
        res.status(404).json(errors);
      }
    });
  }
);

// @route DELETE /api/annexure/:bookId/:annexureId
// @desc  Delete annexure for  particular AnnexureId
// @access Protected

router.delete(
  "/:bookId/:annexureId",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    // Save in the Database
    Annexure.deleteOne({ _id: req.params.annexureId }).then((annexure) => {
      if (annexure) {
        // Structure Model we have to delete one more id from Annexure ID
        StructureBook.update(
          { bookId: req.params.bookId },
          { $pull: { annexure: req.params.annexureId } },
          { safe: true, multi: true }
        )
          .then((doc) => {
            res.status(200).json({ msg: "success" });
          })
          .catch((err) => {
            console.log(`Error from the Delete Annexure ${err}`);
          });
      } else {
        errors.annexure = "[DELETE] This Annexures not found !!!";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
