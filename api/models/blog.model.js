const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "desc", "username"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        desc: { type: "string", minLength: 1 },
        photo: { type: "string", maxLength: 255 },
        username: { type: "string", minLength: 1, maxLength: 255 },
        categories: { type: "array", items: { type: "string" } },
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

  static get relationMappings() {
    const User = require("../models/user.model");
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.username",
          to: "users.username",
        },
      },
    };
    return {};
  }
}

module.exports = Post;
