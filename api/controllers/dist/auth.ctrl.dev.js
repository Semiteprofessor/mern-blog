"use strict";

var _require = require("uuid"),
    uuidv4 = _require.v4;

var User = require("../models/user.model");

var _require2 = require("../utils/password"),
    hashPassword = _require2.hashPassword;

var _require3 = require("../validation"),
    validateCreateAccount = _require3.validateCreateAccount;

var createUser = function createUser(req, res) {
  var _validateCreateAccoun, error, _req$body, name, email, password, existingUsers, _ref, hash, salt, userID;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Validate user input
          _validateCreateAccoun = validateCreateAccount(req.body), error = _validateCreateAccoun.error;

          if (!(error !== undefined)) {
            _context.next = 4;
            break;
          }

          res.status(400).json({
            status: false,
            message: error.details[0].message || "Bad request"
          });
          return _context.abrupt("return");

        case 4:
          _context.prev = 4;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // Check if the user already exists

          _context.next = 8;
          return regeneratorRuntime.awrap(User.query().select("email", "phone").where(function (builder) {
            builder.where("email", email).orWhere("phone", phone);
          }));

        case 8:
          existingUsers = _context.sent;

          if (!(existingUsers.length > 0)) {
            _context.next = 12;
            break;
          }

          res.status(400).json({
            status: false,
            message: "User already exists"
          });
          return _context.abrupt("return");

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 14:
          _ref = _context.sent;
          hash = _ref.hash;
          salt = _ref.salt;
          // Create the user
          userID = uuidv4();
          _context.next = 20;
          return regeneratorRuntime.awrap(User.query().insert({
            user_id: userID,
            name: name,
            email: email,
            password_hash: hash,
            password_salt: salt
          }));

        case 20:
          res.status(201).json({
            status: true,
            message: "User registered successfully"
          });
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          res.status(500).json({
            status: false,
            message: _context.t0.message || "Internal server error"
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 23]]);
};

module.exports = createUser;