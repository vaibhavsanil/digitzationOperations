const express = require("express");
const router = express.Router();

//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const keys = require("../../config/keys");
//const passport = require("passport");

//Load Input Validation

////const validateRegisterInput = require("../../validations/register");
////const validateLoginInput = require("../../validations/login");

// Load Auth Middleware
const auth = require("../../middleware/auth");

//Load User Model

const StructureBook = require("../../models/StructureBook");

// @route GET /api/structbook/test
// @desc  Tests structure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Structure Book Test" }));

// @route GET /api/structbook/new
// @desc  This route creates or updates the new Structure Metadata
// @access Public

router.post(
  "/new",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};
    // Generate unique book id

    // //create a function to create unique numbers

    //Create an object to save in the database
    // Get Fields
    const bookFields = {}; // Create an Object

    //if (req.user._id) bookFields.modified_user = req.user._id; // Remove this after adding the authentication
    bookFields.bookId = req.body.bookId;
    if (req.body.assembly_number)
      bookFields.assembly_number = req.body.assembly_number;
    bookFields.session_number = req.body.session_number;
    if (req.body.volume_number)
      bookFields.volume_number = req.body.volume_number;
    if (req.body.part_number) bookFields.part_number = req.body.part_number;
    bookFields.numofpages = req.body.numofpages;
    bookFields.place_session = req.body.place_session;
    bookFields.year_book = req.body.year_book;
    bookFields.dates_session = req.body.dates_session;
    bookFields.binding_status = req.body.binding_status;
    bookFields.book_returned_date = req.body.book_returned_date;
    bookFields.metadata_given_date = req.body.metadata_given_date;
    bookFields.metadata_start_date = req.body.metadata_start_date;
    bookFields.metadata_end_date = req.body.metadata_end_date;
    bookFields.remarksBook = req.body.remarksBook;
    bookFields.status_metadata_book = req.body.status_metadata_book;
    if (req.user.id) {
      bookFields.modified_user = req.user.id;
    }

    // Save in the Database
    StructureBook.findOne({ _id: req.body._id })
      .then((book) => {
        if (book) {
          //Update the Contents
          StructureBook.findOneAndUpdate(
            { _id: req.body._id },
            { $set: bookFields },
            { new: true }
          )
            .then((strucutbook) => {
              // console.log("The Added Book is ", strucutbook);
              res.status(200).json({
                msg: "success",
              });
            })
            .catch((err) => {
              errors.addbookStruct = `Error in inserting the Book Structural Metadata  `;
              errors.error_reporting = err;
              res.status(400).json(errors);
            });
        } else {
          //Create the New Book Structure

          const newStructBooks = new StructureBook(bookFields);

          newStructBooks
            .save()
            .then((structbook) => {
              // if (!structbook) {
              //   errors.addbookStruct = `Error in inserting the Book Structural Metadata in then  `;
              //   errors.error_reporting = err;
              //   res.status(400).json(errors);
              // }
              // console.log("The Added New Book is ", strucutbook);

              res.status(200).json({
                msg: "success",
              });
            })
            .catch((err) => {
              errors.addbookStruct = `Error in inserting the Book Structural Metadata  `;
              errors.error_reporting = err;
              res.status(400).json(errors);
            });
          // TODO create folders in the static folder with the said book id
          // TODO Call Python script to listent to these folders
        }
      })
      .catch((error) => console.log("[ERROR-DEBUG] ", error));
  }
);

// @route GET /api/structbook/all
// @desc  This route gets all the books
// @access Public

router.get(
  "/all",
  // passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    const errors = {};
    // https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
    StructureBook.find({}, { OCR_PAGES_TEXT: 0 })
      .then((books) => {
        if (!books) {
          errors.structbook = "This Collections is empty";
          res.status(404).json(errors);
        }
        res.status(200).json(books); // Note  Send selected json response fields
      })
      .catch((err) => {
        res
          .status(404)
          .json({ error: `There is no Books in the Database ${err} ` });
      });
  }
);

// @route GET /api/structbook/:bookId
// @desc  This route get the details of the particular Book Id
// @access Private

router.get(
  "/:bookId",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    const errors = {};
    StructureBook.findOne({ _id: req.params.bookId }, { OCR_PAGES_TEXT: 0 })
      .then((book) => {
        if (!book) {
          errors.structbook = "There is no book for this Book Id";
          res.status(404).json(errors);
        }
        res.status(200).json(book);
      })
      .catch((err) =>
        res.status(404).json({
          structbook: "There is no Book for this Book Id",
          error_reporting: err,
        })
      );
  }
);

// @route DELETE /api/structbook/:bookId
// @desc  This router will delete of the particular Book Id
// @access Private

router.delete(
  "/:bookId",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    const errors = {};
    StructureBook.findOneAndRemove({ bookId: req.params.bookId })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err: `${err}` });
      });
  }
);

module.exports = router;
