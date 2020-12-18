const express = require("express");
const router = express.Router();

//const keys = require("../../config/keys");
//const passport = require("passport");
const auth = require("../../middleware/auth");
//Load Input Validation

//Load User Model

const SectionalMetadata = require("../../models/SectionalMetadata");
const StructureBook = require("../../models/StructureBook");

// @route GET /api/structbook/test
// @desc  Tests structure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Sectional Book Test" }));

// @route POST /api/sectionbook/new
// @desc  Post the new Section for the Book
// @access Private

router.post(
  "/new",
  //passport.authenticate("jwt", { session: false }),
  auth,

  (req, res) => {
    // Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const sectionalFields = {}; // Create an Object

    sectionalFields.struct_id = req.body.struct_id;
    sectionalFields.book_id = req.body.book_id;
    if (req.user.id) sectionalFields.modified_user = req.user.id;
    sectionalFields.section_type = req.body.section_type;
    sectionalFields.start_page = req.body.start_page;
    sectionalFields.end_page = req.body.end_page;
    sectionalFields.debate_title_subject = req.body.debate_title_subject;
    sectionalFields.debate_subject_kan = req.body.debate_subject_kan;
    if (req.body.issues_section)
      sectionalFields.issues_section = req.body.issues_section;
    if (req.body.tags_array) sectionalFields.tags_array = req.body.tags_array;
    sectionalFields.debate_section_date = req.body.debate_section_date;
    if (req.body.question_number)
      sectionalFields.question_number = req.body.question_number;
    if (req.body.questioner_name)
      sectionalFields.questioner_name = req.body.questioner_name;
    if (req.body.minister_name)
      sectionalFields.minister_name = req.body.minister_name;
    if (req.body.minister_portfolio)
      sectionalFields.minister_portfolio = req.body.minister_portfolio;
    if (req.body.annexure) sectionalFields.annexure = req.body.annexure;
    if (req.body.debate_participants)
      sectionalFields.debate_participants = req.body.debate_participants;
    //debate_paticipants  debate_participants

    //console.log("[SECTION FIELDS req.body] ", req.body);

    SectionalMetadata.findOne({ _id: req.body._id }).then((sectionmetadata) => {
      if (sectionmetadata) {
        // Update the contents

        SectionalMetadata.findOneAndUpdate(
          { _id: req.body._id },
          { $set: sectionalFields },
          { new: true }
        )
          .then((section) => {
            // Editing the sectional metadata
            res.status(200).json({ msg: "success" });
          })
          .catch((err) => res.status(400).json(err));
      } else {
        new SectionalMetadata(sectionalFields)
          .save()
          .then((sectionbook) => {
            // console.log("[SECTION BOOK] ", sectionbook);
            StructureBook.findOneAndUpdate(
              { bookId: sectionalFields.book_id },
              {
                $push: {
                  sectionsbook: sectionbook._id,
                },
              },
              { new: true }
            )
              .then((sectionmetadata) => {
                // console.log("[DEBUG] sectional metadata doc ", sectionmetadata);
                res.status(200).json({ msg: "success" });
              })
              .catch((err) => {
                errors.sectionalmetadata =
                  "Failed to Store Sectional Metadata in Structural Book ";
                errors.err_reported = err;
                res.status(400).json(error);
              });
            //  res.status(200).json(sectionbook);
          })
          .catch((err) => {
            errors.sectionalbook =
              "Failed to Insert Collection in Sectional Model";
            errors.err_reported = err;
            res.status(400).json(errors);
          });
      }
    });
  }
);

// // @route PUT /api/structbook/update/:annexureId
// // @desc  Update the new Section for the Book
// // @access Private

// router.put(
//   "/update/:sectionid",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // Validate the Inputs if Required
//     let errors = {};

//     //Create an object to save in the database
//     // Get Fields
//     const sectionalFields = {}; // Create an Object
//     if (req.body.struc_id) sectionalFields.struc_id = req.params.structId;
//     if (req.body.book_id_num) sectionalFields.book_id_num = req.params.bookId;
//     sectionalFields.modified_user = req.user._id;
//     sectionalFields.section_type = req.body.section_type;
//     sectionalFields.start_page = req.body.start_page;
//     sectionalFields.end_page = req.body.end_page;
//     sectionalFields.debate_title_subject = req.body.debate_title_subject;
//     sectionalFields.debate_subject = req.body.debate_subject;
//     if (req.body.issues_section)
//       sectionalFields.issues_section = req.body.issues_section;
//     if (req.body.tags_array) sectionalFields.tags_array = req.body.tags_array;
//     sectionalFields.debate_section_date = req.body.debate_section_date;
//     if (req.body.question_number)
//       sectionalFields.question_number = req.body.question_number;
//     if (req.body.minister_name)
//       sectionalFields.minister_name = req.body.minister_name;
//     if (req.body.minister_portfolio)
//       sectionalFields.minister_portfolio = req.body.minister_portfolio;
//     if (req.body.annexure) sectionalFields.annexure = req.body.annexure;
//     if (req.body.debate_participants)
//       sectionalFields.debate_participants = req.body.debate_participants;

//     SectionalMetadata.findByIdAndUpdate(
//       { _id: req.param.sec },
//       {
//         $set: sectionalFields,
//       },
//       { new: true }
//     )
//       .then((section) => res.status(200).json(section))
//       .catch((err) => {
//         errors.section_update =
//           "The sectional errors has occured during updation";
//         errors.err_reported = err;
//         res.status(400).json(errors);
//       });
//   }
// );

// @route GET /api/sectionbook/:sectionId
// @desc  Get a particular Section of the metadata
// @access Private

router.get(
  "/:sectionid",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    let errors = {};

    SectionalMetadata.findById({ _id: req.params.sectionid })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        errors.sectionalbook =
          "Error Fetching the Section of the Book !!! Please check Section id";
        errors.err_reported = err;
        res.status(200).json(errors);
      });
  }
);

// @route GET /api/sectionbook/:bookID
// @desc  get a particualr sections for the book
// @access Private

router.get(
  "/get/:bookId",
  auth,
  //passport.authenticate("jwt", { session: false }),
  // http://ronaldroe.com/populating-multiple-fields-and-levels-with-mongoose/
  (req, res) => {
    let errors = {};

    SectionalMetadata.find({ book_id: req.params.bookId })
      .populate("debate_title_subject", "name_eng")
      .populate("debate_participants", "name_eng")
      .exec(function (err, doc) {
        if (doc) {
          res.status(200).json(doc);
        } else {
          errors.sectionalbook =
            "Error Fetching the Book !!! Please check Book Id id";
          errors.err_reported = err;
          res.status(200).json(errors);
        }
      });
  }
);

// @route DELTE /api/sectionbook/:bookID
// @desc  delete all the sections for the book
// @access Private

router.delete(
  "/:bookId",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    let errors = {};

    SectionalMetadata.deleteMany({ struct_book_id: bookId })
      .then((doc) => {
        StructureBook.findByIdAndUpdate(
          { book_id_num: bookId },
          {
            $set: {
              sectionsbook: [],
            },
          },
          { new: true }
        )
          .then((structdoc) => {
            console.log(
              `[SUCCESS]This Document from delete request from delete BOOKID ${structdoc}`
            );
          })
          .catch((err) => {
            errors.sectionalbook =
              "There was an error in deleting the Reference model";
            errors.err_reported = err;
            res.status(400).json(errors);
          });
        res.status(200).json(doc);
      })
      .catch((err) => {
        errors.sectionalbook =
          "[ERROR] Error in deleting the Sections in the Book";
        errors.err_reported = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELTE /api/sectionbook/:bookid/:sectionId
// @desc  delete particular  sections in the book
// @access Private

router.delete(
  "/:bookId/:sectionId",
  auth,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    SectionalMetadata.deleteOne({ _id: req.params.sectionId })
      .then((doc) => {
        StructureBook.findOneAndUpdate(
          { bookId: req.params.bookId },
          {
            $pull: {
              sectionsbook: req.params.sectionId,
            },
          },
          { new: true, multi: true }
        )
          .then((structdoc) => {
            res.status(200).json({ msg: "success" });
          })
          .catch((err) => {
            errors.sectionalbook =
              "There was an error in deleting section the Structural Book model";
            errors.err_reported = err;
            res.status(400).json(errors);
          });
      })
      .catch((err) => {
        errors.sectionalbook =
          "[ERROR] Error in deleting the Sections of the Book in Sectional Metadata Model";
        errors.err_reported = err;
        res.status(400).json(errors);
      });
  }
);

module.exports = router;
