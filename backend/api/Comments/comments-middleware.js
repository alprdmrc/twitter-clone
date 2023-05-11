const tweetsModel = require("../Tweets/tweets-model");

const isTweetExist = async (req, res, next) => {
  try {
    const tweet = await tweetsModel.getById(req.params.tweet_id);
    if (!tweet || !tweet.length > 0) {
      res.status(404).json({ message: "Boyle bir tweet yok!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const payloadCheck = (req, res, next) => {
  try {
    const { reply } = req.body;
  } catch (error) {}
};

module.exports = { isTweetExist };
