const db = require("../../data/db-config");

const gelAll = () => {
  return db("Comments");
};

const getTweetComments = async (tweet_id) => {
  const tweetComments = await db("Comments").where({ tweet_id: tweet_id });
  return tweetComments;
};

const postComment = async (comment) => {
  const [insertedCommentId] = await db("Comments").insert(comment);
  const insertedComment = await db("Comments").where({
    comment_id: insertedCommentId,
  });
  return insertedComment;
};

module.exports = { gelAll, getTweetComments, postComment };
