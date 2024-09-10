const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 3, maxLength: 20 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 8, maxLength: 100 },
        createdAt: {
          type: "string",
          format: "date-time",
          default: () => new Date().toISOString(),
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          default: () => new Date().toISOString(),
        },
      },
    };
  }
}

module.exports = User;
