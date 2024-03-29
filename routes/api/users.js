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

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email Already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin_status: req.body.admin_status,
        phonenumber: req.body.phonenumber,
        joining_date: req.body.joining_date,
        date_of_leaving: req.body.date_of_leaving,
        status_user: req.body.status_user,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
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
            res.json({
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

router.put(
  "/userupdate/:userid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

// @route GET ALL USER
// @desc  Get all the user details
// @access Private

router.get(
  "/getusers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}).then((users) => {
      res.status(200).json(users); // Note  Send selected json response fields
    });
  }
);

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

module.exports = router;
