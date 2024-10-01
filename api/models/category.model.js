const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "categories";
  }
  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "createdAt", "updatedAt"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 3, maxLength: 50 },
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
    const Post = require("../models/post.model");
    return {
      posts: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: "categories.id",
          through: {
            modelClass: require("../models/category_post.model"),
            join: {
              from: "categories.id",
              to: "category_posts.categoryId",
            },
          },
          to: "posts.id",
        },
      },
    };
    return {};
  }
}
