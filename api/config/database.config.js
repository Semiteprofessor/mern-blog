require("dotenv").config();

const knex = require("knex");
const { Model } = require("objection");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

Model.knex(db);

module.exports = { knex, Model };
