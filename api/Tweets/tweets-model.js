const db = require("../../data/db-config");

const getAll = async () => {
  const tweets = await db("Tweets"); //returns []
  return tweets;
};
const getById = async (id) => {
  const tweet = await db("Tweets").where({ tweet_id: id }); //returns []
  return tweet;
};

const getBy = async (filter) => {
  const tweets = await db("Tweets").where(filter); //returns []
  return tweets;
};

const create = async (tweet) => {
  const [insertedId] = await db("Tweets").insert(tweet);
  const [insertedTweet] = await getBy({ tweet_id: insertedId });
  return insertedTweet; //returns {}
};

const remove = async (id) => {
  const deletedTweet = await db("Tweets")
    .where({ tweet_id: id })
    .update({ deletedAt: new Date().toISOString().slice(0, 10) }, [
      "tweet_id",
      "message",
      "deletedAt",
    ]);
  return deletedTweet;
};

module.exports = { getAll, getById, getBy, create, remove };
