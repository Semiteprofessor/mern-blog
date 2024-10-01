const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "desc"],

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
    const User = require("./user.model");
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.username",
          to: "users.username",
        },
      },
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: require("./category.model"),
        join: {
          from: "posts.id",
          through: {
            modelClass: require("./category.model"),
            join: {
              from: "posts.id",
              to: "categories.id",
            },
          },
        },
      }
    };
    return {};
  }
}

module.exports = Post;
