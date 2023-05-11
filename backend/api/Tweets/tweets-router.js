const router = require("express").Router();
const tweetsModel = require("./tweets-model");
const followersModel = require("../Followers/followers-model");
const auth_mw = require("../Auth/auth-middleware");

router.get("/", auth_mw.openTo(["Admin"]), async (req, res, next) => {
  try {
    const tweets = await tweetsModel.getAll();
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

//get only logged in users feed (followings' tweets)
router.get("/feed", async (req, res, next) => {
  try {
    const followings = await followersModel.getAllFollowings(
      req.decodedToken.user_id
    );
    const followingIds = followings.followings.reduce(
      (acc, follow) => {
        delete follow.name;
        acc.push(follow.user_id);
        return acc;
      },
      [req.decodedToken.user_id]
    );
    const feed = await tweetsModel.getOwnFeed(followingIds);
    res.json(feed);
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

router.delete(
  "/:id",
  auth_mw.openTo(["Prime_User", "Admin"]),
  async (req, res, next) => {
    try {
      const deletedTweet = await tweetsModel.remove(req.params.id);
      res.json(deletedTweet);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
