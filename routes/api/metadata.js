const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
var ObjectId = require("mongodb").ObjectID;

//const keys = require("../../config/keys");
//const passport = require("passport");

//Load Input Validation

//Load Dependent  Models
const DebateTitle = require("../../models/DebateTitle"); // LOAD Debate Title Models
const MinistryPortfolio = require("../../models/MinisterPortfolio"); // Load Minstry Portfolio Model
const Issues = require("../../models/Issues");
const Tags = require("../../models/Tags");
const SpeakerName = require("../../models/Speaker");
const MemberParticipant = require("../../models/MemberParticipant");
const ChairmanName = require("../../models/Chairman");

// @route GET /api/metadata/test
// @desc  Tests structure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Metadata Routes Works" }));

////////////////////////////    Speaker Name       ///////////////////////////////

// @route GET /api/metadata/speaker/:speakerid/get
// @desc  GET a particular speaker Id
// @access private

router.get(
  "/speaker/:speakerid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //const objectId = ObjectId(req.params.speakerid);

    console.log("Type of Request Params", req.params.speakerid);
    //console.log("Type of Object Request Params", typeof objectId);

    SpeakerName.findOne({ _id: req.params.speakerid }, "-__v")
      .then((speakername) => {
        if (!speakername) {
          errors.speakerName =
            "The Speaker Name dont exist for this Speaker Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(speakername);
      })
      .catch((err) => {
        errors.speakerName =
          "[ERROR-SpeakerName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route POST /api/metadata/speaker/new
// @desc  Speaker New ADD & NEW update the titles
// @access private

router.post(
  "/speaker/new",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};
    console.log(req.body);
    //Create an object to save in the database
    // Get Fields
    const nameFields = {}; // Create an Object

    if (req.user.id) nameFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) nameFields._id = req.body._id;
    nameFields.name_eng = req.body.name_eng;
    nameFields.name_kan = req.body.name_kan;
    nameFields.status = req.body.status;
    console.log("The name fields ", nameFields);
    // Save in the Database
    SpeakerName.findOne({ _id: req.body._id }).then((speakername) => {
      if (speakername) {
        //Update the Contents
        SpeakerName.findOneAndUpdate(
          { _id: req.body._id },
          { $set: nameFields },
          { new: true }
        )
          .then(() =>
            res.status(200).json({
              msg: `${nameFields.name_eng} added succesfuly into the database`,
            })
          )
          .catch((err) => {
            errors.speakerName = `Error in updating ${nameFields.name_eng} into the Speaker Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Book Structure
        new SpeakerName(nameFields)
          .save()
          .then((speakername) =>
            res.status(200).json({
              msg: `${speakername.name_eng} inserted successfully into the database !!!`,
            })
          )
          .catch((err) => {
            errors.speakerName = `Error in inserting new ${nameFields.name_eng} into the Speaker Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      }
    });
  }
);

// @route GET /api/metadata/speaker/all
// @desc  GET  Speaker Name all
// @access private

router.get(
  "/speaker/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    SpeakerName.find({})
      .then((speakernames) => {
        if (!speakernames) {
          errors.speakerName =
            "There are no Speaker Names in the Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(speakernames);
      })
      .catch((err) => {
        errors.speakerName =
          "[ERROR-SpeakerName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/debatetitles/:debatetitleid
// @desc  Delete a particular Debate Title
// @access private

router.delete(
  "/speaker/:speakerid",
  // passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    SpeakerName.findByIdAndDelete({ _id: req.params.speakerid })
      .then((speakername) => {
        if (!speakername) {
          errors.speakerName =
            "[ERROR-SPEAKER-DELETE] The Speaker Name dont exist for this Speaker Name Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.speakerName =
          "[ERROR-DELETE-SpeakerName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

////////////////////////////    Debate Particiapants       ///////////////////////////////

// @route GET /api/metadata/member/:memberid/get
// @desc  GET a particular Members Id
// @access private

router.get(
  "/member/:memberid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MemberParticipant.findOne({ _id: req.params.memberid }, "-__v")
      .then((membername) => {
        if (!membername) {
          errors.memberName =
            "The Member Name dont exist for this Member Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(membername);
      })
      .catch((err) => {
        errors.memberName =
          "[ERROR-MemberName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route POST /api/metadata/member/new
// @desc  Member New ADD & NEW update the Members
// @access private

router.post(
  "/member/new",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const nameFields = {}; // Create an Object

    if (req.user.id) nameFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) nameFields._id = req.body._id;
    nameFields.name_eng = req.body.name_eng;
    nameFields.name_kan = req.body.name_kan;
    nameFields.status = req.body.status;

    // Save in the Database
    MemberParticipant.findOne({ _id: req.body._id }).then((membername) => {
      if (membername) {
        //Update the Contents
        MemberParticipant.findOneAndUpdate(
          { _id: req.body._id },
          { $set: nameFields },
          { new: true }
        )
          .then(() =>
            res.status(200).json({
              msg: `${nameFields.name_eng} added succesfuly into the database`,
            })
          )
          .catch((err) => {
            errors.memberName = `Error in updating ${nameFields.name_eng} into the Members Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Book Structure
        new MemberParticipant(nameFields)
          .save()
          .then((membername) =>
            res.status(200).json({
              msg: `${membername.name_eng} inserted successfully into the database !!!`,
            })
          )
          .catch((err) => {
            errors.speakerName = `Error in inserting new ${nameFields.name_eng} into the Member's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      }
    });
  }
);

// @route GET /api/metadata/member/all
// @desc  GET  Members Name all
// @access private

router.get(
  "/member/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MemberParticipant.find({})
      .then((membernames) => {
        if (!membernames) {
          errors.memberName =
            "There are no Member Names in the Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(membernames);
      })
      .catch((err) => {
        errors.memberName =
          "[ERROR-MemberName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/member/:memberid
// @desc  Delete a particular Member Name
// @access private

router.delete(
  "/member/:memberid",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MemberParticipant.findByIdAndDelete({ _id: req.params.memberid })
      .then((membername) => {
        if (!membername) {
          errors.memberName = `[ERROR-MEMBER-DELETE] The Member Name dont exist for this Member Name Id!!!`;
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.memberName =
          "[ERROR-DELETE-MemberName] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

////////////////////////////    Debate Titles       ///////////////////////////////

// @route GET /api/metadata/debatetitles/new
// @desc  Debate Titles ADD & NEW update the titles
// @access private

router.post(
  "/debatetitle/new",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inp uts if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const debateTitleFields = {}; // Create an Object

    if (req.user.id) debateTitleFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) debateTitleFields._id = req.body._id;
    debateTitleFields.name_eng = req.body.name_eng;
    debateTitleFields.name_kan = req.body.name_kan;
    debateTitleFields.status = req.body.status;

    // Save in the Database
    DebateTitle.findOne({ _id: req.body._id }).then((debatetitle) => {
      if (debatetitle) {
        //Update the Contents
        DebateTitle.findOneAndUpdate(
          { _id: req.body._id },
          { $set: debateTitleFields },
          { new: true }
        )
          .then(() => {
            res.status(200).json({
              msg: `${debateTitleFields.name_eng} added succesfuly into the database`,
            });
          })
          .catch((err) => {
            errors.debateTitle = `Error in updating ${nameFields.name_eng} into the Debate Title's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Book Structure
        new DebateTitle(debateTitleFields)
          .save()
          .then((debatetitle) =>
            res.status(200).json({
              msg: `${debateTitleFields.name_eng} inserted successfully into the database !!!`,
            })
          )
          .catch((err) => {
            errors.debateTitle = `Error in inserting new ${nameFields.name_eng} into the Member's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      }
    });
  }
);

// @route GET /api/metadata/debatetitles/all
// @desc  GET Debate Titles all
// @access private

router.get(
  "/debatetitle/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    DebateTitle.find({})
      .then((debatetitles) => {
        if (!debatetitles) {
          errors.debatetitle =
            "There are no Debate Titles in the Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(debatetitles);
      })
      .catch((err) => {
        errors.debateTitle =
          "[ERROR-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route GET /api/metadata/debatetitles/:debatetitleid
// @desc  GET a particular debate id
// @access private

router.get(
  "/debatetitle/:debatetitleid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    DebateTitle.findById({ _id: req.params.debatetitleid })
      .then((debatetitle) => {
        if (!debatetitle) {
          errors.debatetitle =
            "The Debate Title dont exist for this Debate Title Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(debatetitle);
      })
      .catch((err) => {
        errors.debateTitle =
          "[ERROR-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/debatetitles/:debatetitleid
// @desc  Delete a particular Debate Title
// @access private

router.delete(
  "/debatetitle/:debatetitleid",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    DebateTitle.findByIdAndDelete({ _id: req.params.debatetitleid })
      .then((debatetitle) => {
        if (!debatetitle) {
          errors.debateTitle =
            "[DELETE] The Debate Title dont exist for this Debate Title Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.debateTitle =
          "[ERROR-DELETE-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

////////////////////////////    Minister's Portfolio       /////////////////

// @route GET /api/metadata/portfolio/new
// @desc   ADD & Update the portfolio
// @access private

router.post(
  "/portfolio/new",
  // passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const portfolioFields = {}; // Create an Object

    if (req.user.id) portfolioFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) portfolioFields._id = req.body._id;
    portfolioFields.name_eng = req.body.name_eng;
    portfolioFields.name_kan = req.body.name_kan;
    portfolioFields.status = req.body.status;

    // Save in the Database
    MinistryPortfolio.findOne({ _id: req.body._id }).then((debatetitle) => {
      if (debatetitle) {
        //Update the Contents
        MinistryPortfolio.findOneAndUpdate(
          { _id: req.body._id },
          { $set: portfolioFields },
          { new: true }
        )
          .then((portfolio) => {
            res.status(200).json({
              msg: `${portfolioFields.name_eng} added succesfuly into the database`,
            });
          })
          .catch((err) => {
            errors.portfolioMinistry = `Error in updating ${portfolioFields.name_eng} into the Debate Title's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Book Structure
        new MinistryPortfolio(portfolioFields)
          .save()
          .then((portfolio) =>
            res.status(200).json({
              msg: `${portfolioFields.name_eng} added succesfuly into the database`,
            })
          )
          .catch((err) => {
            errors.portfolioMinistry = `Error in inserting new ${portfolioFields.name_eng} into the Portfolio's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
        // TODO create folders in the static folder with the said book id
        // TODO Call Python script to listent to these folders
      }
    });
  }
);

// @route GET /api/metadata/portfolio/all
// @desc  GET Debate Titles all
// @access private

router.get(
  "/portfolio/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MinistryPortfolio.find({})
      .then((portfolio) => {
        if (!portfolio) {
          errors.portfolio =
            "There are no portfolios in the Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(portfolio);
      })
      .catch((err) => {
        errors.portfolioMinistry =
          "[ERROR-Portfolio-All-Get] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route GET /api/metadata/portfolio/:portfolioid
// @desc  GET a particular Portfolio
// @access private

router.get(
  "/portfolio/:portfolioid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MinistryPortfolio.findById({ _id: req.params.portfolioid })
      .then((portfolio) => {
        if (!portfolio) {
          errors.debatetitle =
            "The Ministry Portfolio dont exist for this Portfolio Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(portfolio);
      })
      .catch((err) => {
        errors.portfolioMinistry =
          "[ERROR-PortFolioMinistry] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/portfolio/:portfolioid
// @desc  Delete a particular Portfolio
// @access private

router.delete(
  "/portfolio/:portfolioid",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    MinistryPortfolio.findByIdAndDelete({ _id: req.params.portfolioid })
      .then((portfolioid) => {
        if (!portfolioid) {
          errors.portfolioMinistry =
            "[DELETE] The Portfolio dont exist for this Portfolio Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.portfolioMinistry =
          "[ERROR-DELETE-Portfolio] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

////////////////////////////    ISSUES       /////////////////

// @route POST /api/metadata/issues/new
// @desc   ADD & Update the ISSUES
// @access private

router.post(
  "/issues/new",
  // passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const issuesFields = {}; // Create an Object

    if (req.user.id) issuesFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) issuesFields._id = req.body._id;
    issuesFields.name_eng = req.body.name_eng;
    issuesFields.name_kan = req.body.name_kan;
    issuesFields.status = req.body.status;

    // Save in the Database
    Issues.findOne({ _id: req.body._id }).then((issues) => {
      if (issues) {
        //Update the Contents
        Issues.findOneAndUpdate(
          { _id: req.body._id },
          { $set: issuesFields },
          { new: true }
        )
          .then((issues) =>
            res.status(200).json({
              msg: `${issuesFields.name_eng} added succesfuly into the database`,
            })
          )
          .catch((err) => {
            errors.issuesFields = `Error in updating ${nameFields.name_eng} into the Debate Title's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Issues Instance
        new Issues(issuesFields)
          .save()
          .then((issues) =>
            res.status(200).json({
              msg: `${issuesFields.name_eng} added succesfuly into the database)`,
            })
          )
          .catch((err) => {
            errors.issuesFields =
              "Error in inserting new Issues into the Issues Model";
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
        // TODO create folders in the static folder with the said book id
        // TODO Call Python script to listent to these folders
      }
    });
  }
);

// @route GET /api/metadata/issues/all
// @desc   GEt all the ISSUES
// @access private

router.get(
  "/issues/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Issues.find({})
      .then((issues) => {
        if (!issues) {
          errors.issuesFields =
            "There are no issues in the Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(issues);
      })
      .catch((err) => {
        errors.issuesFields =
          "[ERROR-IssueFields] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route GET /api/metadata/issues/:issuesid
// @desc  GET a particular Issue
// @access private

router.get(
  "/issues/:issuesid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Issues.findById({ _id: req.params.issuesid })
      .then((issues) => {
        if (!issues) {
          errors.issuesFields = "The Issues dont exist for this Issues Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(issues);
      })
      .catch((err) => {
        errors.issuesFields =
          "[ERROR-Issues] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/issues/:issuesid
// @desc  Delete a particular Issue
// @access private

router.delete(
  "/issues/:issuesid",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Issues.findByIdAndDelete({ _id: req.params.issuesid })
      .then((issuesid) => {
        if (!issuesid) {
          errors.issuesFields =
            "[DELETE] The Issues dont exist for this Issues Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.issuesFields =
          "[ERROR-DELETE-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

////////////////////////////    TAGS       /////////////////

// @route POST /api/metadata/tags/new
// @desc   ADD & Update the Tags
// @access private

router.post(
  "/tags/new",
  auth,
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    //Create an object to save in the database
    // Get Fields
    const tagsFields = {}; // Create an Object

    if (req.user.id) tagsFields.modified_user = req.user.id; // Remove this after adding the authentication
    if (req.body._id) tagsFields._id = req.body._id;
    tagsFields.name_eng = req.body.name_eng;
    tagsFields.name_kan = req.body.name_kan;
    tagsFields.status = req.body.status;

    // Save in the Database
    Tags.findOne({ _id: req.body._id }).then((tags) => {
      if (tags) {
        //Update the Contents
        Tags.findOneAndUpdate(
          { _id: req.body._id },
          { $set: tagsFields },
          { new: true }
        )
          .then((tags) => {
            res.status(200).json({
              msg: `${tagsFields.name_eng} added succesfuly into the database`,
            });
          })
          .catch((err) => {
            errors.tagsFields = `Error in inserting new ${tagsFields.name_eng} into the Tag's Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
      } else {
        //Create the New Issues Instance
        new Tags(tagsFields)
          .save()
          .then((tags) =>
            res.status(200).json({
              msg: `${tagsFields.name_eng} inserted successfully into the database !!!`,
            })
          )
          .catch((err) => {
            errors.tagsFields = `Error in inserting new tag ${tagsFields.name_eng}  into the Tags Model`;
            errors.error_reporting = err;
            res.status(400).json(errors);
          });
        // TODO create folders in the static folder with the said book id
        // TODO Call Python script to listent to these folders
      }
    });
  }
);

// @route GET /api/metadata/tags/all
// @desc   GEt all the Tags
// @access private

router.get(
  "/tags/all",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Tags.find({})
      .then((tags) => {
        if (!tags) {
          errors.tagsFields =
            "There are no tags in the Tags Model,Please Add One";
          res.status(404).json(errors);
        }

        res.status(200).json(tags);
      })
      .catch((err) => {
        errors.tagsFields =
          "[ERROR-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route GET /api/metadata/issues/:issuesid
// @desc  GET a particular Issue
// @access private

router.get(
  "/tags/:tagsid/get",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Tags.findById({ _id: req.params.tagsid })
      .then((tags) => {
        if (!tags) {
          errors.tagsFields = "The Tags dont exist for this Tags Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json(tags);
      })
      .catch((err) => {
        errors.tagsFields =
          "[ERROR-Tags] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /api/metadata/tags/:tagsid
// @desc  Delete a particular Tag
// @access private

router.delete(
  "/tags/:tagsid",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    //TODO Validate the Inputs if Required
    let errors = {};

    Tags.findByIdAndDelete({ _id: req.params.tagsid })
      .then((tagsid) => {
        if (!tagsid) {
          errors.tagsFields =
            "[DELETE] The Tags dont exist for this Tags Id!!!";
          res.status(404).json(errors);
        }

        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        errors.tagsFields =
          "[ERROR-DELETE-DebateTitle] There is an internal failure in the software ,Please Contact System Administrator";
        errors.error_reporting = err;
        res.status(400).json(errors);
      });
  }
);

module.exports = router;
