const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const auth = require("../../middleware/auth");

//Load Input Validation

const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

//Load User Model

const User = require("../../models/User");
const Logs = require("../../models/Logs");

// @route GET api/users/test
// @desc  Tests user route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Krishna Onde Jagadguru" }));

// @route GET api/users/register
// @desc  Register
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let userBody = {};

  userBody.name = req.body.name;
  userBody.email = req.body.email;
  userBody.password = req.body.password;
  userBody.admin_status = req.body.admin_status;
  if (req.body.phonenumber) userBody.phonenumber = req.body.phonenumber;
  if (req.body.joining_date) userBody.joining_date = req.body.joining_date;
  if (req.body.date_of_leaving)
    userBody.date_of_leaving = req.body.date_of_leaving;
  if (req.body.status_user) userBody.status_user = req.body.status_user;

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email Already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User(userBody);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json({ msg: "success", user }))
            .catch((err) =>
              res.status(400).json({
                msg: "There is an internal error while saving user!!!",
              })
            );
        });
      });
    }
  });
});

// @route GET api/users/login        //
// @desc  Login User / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User By Email
  User.findOne({ email }).then((user) => {
    //Check for User
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          admin_status: user.admin_status,
          status_user: user.status_user,
        }; // Create JWT payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: token,
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET UPDATE USER
// @desc  UPDATE the user details
// @access Private

router.post("/userupdate/:userid", auth, (req, res) => {
  let userId = req.params.userid;
});

// @route DELETE /api/users/:userId
// @desc  UPDATE the user details
// @access Private

router.delete("/:userid", auth, (req, res) => {
  let userId = req.params.userid;

  // Check of the User is admin
  User.find({ _id: userId })
    .then(async (usr) => {
      if (usr.admin_status === true) {
        res.status(401).json({
          msg: `The user ${req.user} cannot be deleted as it has admin status !!!`,
        });
      } else {
        User.deleteOne({ _id: userId }).then((doc) => {
          res.status(200).json({ msg: "success" });
        });
      }
    })
    .catch((err) => {
      let errors = {};
      errors.msg = `Cannot Delete the User with id ${userId}`;
      errors.err = err;

      res.status(400).json(errors);
    });
});

// @route GET ALL USER
// @desc  Get all the user details
// @access Private

router.get("/getusers", auth, (req, res) => {
  User.find({}, "-password -__v")
    .then((users) => {
      res.status(200).json(users); // Note  Send selected json response fields
    })
    .catch((err) => {
      const errors = {};
      errors.message = "The Users Not Found!!!";
      errors.err = err;
      res.status(400).json(errors);
    });
});

// @route GET api/users/current
// @desc  Testing Passport Return Current User
// @access Private

router.get(
  "/current",
  //passport.authenticate("jwt", { session: false }),
  auth,
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      admin_status: req.user.admin_status,
      status_user: req.user.status_user,
    });
  }
);

// @route GET api/users/logs
// @desc  Getting all the logs of the user
// @access Private
router.get("/logs", auth, (req, res) => {
  Logs.find({})
    .sort({ logDate: -1 })
    .limit(100)
    .then((logs) => {
      res.status(200).json(logs); // Note  Send selected json response fields
    })
    .catch((err) => {
      const errors = {};
      errors.message = "The Users Not Found!!!";
      errors.err = err;
      res.status(400).json(errors);
    });
});

module.exports = router;
