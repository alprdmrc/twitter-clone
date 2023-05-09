const router = require("express").Router();
const tweetsModel = require("./tweets-model");
const auth_mw = require("../Auth/auth-middleware");

router.get("/", async (req, res, next) => {
  try {
    const tweets = await tweetsModel.getAll();
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const tweets = await tweetsModel.getById(req.params.id);
  res.json(tweets);
});

router.post("/", async (req, res, next) => {
  try {
    const { user_id } = req.decodedToken;
    const { message } = req.body;
    const insertedTweet = await tweetsModel.create({
      user_id: user_id,
      message: message,
    });
    res.status(201).json(insertedTweet);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTweet = await tweetsModel.remove(req.params.id);
    res.json(deletedTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
