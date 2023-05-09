/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("name").notNullable();
      tbl.string("email").unique().notNullable();
      tbl.string("password").notNullable();
      tbl.string("role").notNullable();
      tbl.timestamps({
        useCamelCase: true,
        defaultToNow: true,
        useTimestamps: true,
      });
    })
    .createTable("Tweets", (tbl) => {
      tbl.increments("tweet_id");
      tbl
        .bigInteger("user_id")
        .references("user_id")
        .inTable("Users")
        .notNullable()
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl.string("message", 128).notNullable();
      tbl.bigInteger("favorite_cnt");
      tbl.date("deletedAt");
      tbl.timestamps({
        useCamelCase: true,
        defaultToNow: true,
        useTimestamps: true,
      });
    })
    .createTable("Followers", (tbl) => {
      tbl
        .integer("follower_id")
        .references("user_id")
        .inTable("Users")
        .notNullable()
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl
        .integer("followee_id")
        .references("user_id")
        .inTable("Users")
        .notNullable()
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl.primary(["follower_id", "followee_id"]);
      tbl.timestamps({
        useCamelCase: true,
        defaultToNow: true,
        useTimestamps: true,
      });
    })
    .createTable("Comments", (tbl) => {
      tbl.increments("comment_id");
      tbl
        .bigInteger("user_id")
        .references("user_id")
        .inTable("Users")
        .notNullable()
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl
        .bigInteger("tweet_id")
        .references("tweet_id")
        .inTable("Tweets")
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      tbl.string("reply", 128).notNullable();
      tbl.timestamps({
        useCamelCase: true,
        defaultToNow: true,
        useTimestamps: true,
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Comments")
    .dropTableIfExists("Followers")
    .dropTableIfExists("Tweets")
    .dropTableIfExists("Users");
};
