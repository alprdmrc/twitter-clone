/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Comments").truncate();
  await knex("Followers").truncate();
  await knex("Tweets").truncate();
  await knex("Users").truncate();
  await knex("Users").insert([
    {
      user_id: 1,
      name: "Alper",
      email: "alper@gmail.com",
      password: "$2a$10$H4s.fQqTdOpoGgcS9Kqew.jJ14l2wQ1lxRBR4/GTVckj1Sm7MkV22",
      role: "Admin",
    },
    {
      user_id: 2,
      name: "Umut",
      email: "umut@gmail.com",
      password: "$2a$10$H4s.fQqTdOpoGgcS9Kqew.jJ14l2wQ1lxRBR4/GTVckj1Sm7MkV22",
      role: "Prime_User",
    },
    {
      user_id: 3,
      name: "Doruk",
      email: "doruk@gmail.com",
      password: "$2a$10$H4s.fQqTdOpoGgcS9Kqew.jJ14l2wQ1lxRBR4/GTVckj1Sm7MkV22",
      role: "User",
    },
  ]);
  await knex("Tweets").insert([
    {
      tweet_id: 1,
      user_id: 1,
      message: "Lorem ipsum dolar 1 alper tweet",
      favorite_cnt: "5",
    },
    {
      tweet_id: 2,
      user_id: 1,
      message: "Karam ipsum colar 2 alper tweet",
      favorite_cnt: "3",
    },
    {
      tweet_id: 3,
      user_id: 2,
      message: "Dolor ipsum dolar 2 umut tweet",
      favorite_cnt: "7",
    },
    {
      tweet_id: 4,
      user_id: 3,
      message: "Dolar ipsit amet  3 doruk tweet",
      favorite_cnt: "10",
    },
  ]);
  await knex("Followers").insert([
    { follower_id: 1, followee_id: 2 },
    { follower_id: 1, followee_id: 3 },
    { follower_id: 2, followee_id: 1 },
    { follower_id: 3, followee_id: 1 },
    { follower_id: 3, followee_id: 2 },
  ]);
  await knex("Comments").insert([
    { comment_id: 1, user_id: 2, tweet_id: 1, reply: "Bu tweet cok sacma ama" },
    {
      comment_id: 2,
      user_id: 1,
      tweet_id: 4,
      reply: "Cok guzel tweet tebrikler",
    },
    {
      comment_id: 3,
      user_id: 2,
      tweet_id: 4,
      reply: "Fikirlerin icin tesekkurler",
    },
  ]);
};
