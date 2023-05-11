const router = require("express").Router();
const followersModel = require("./followers-model");
const mw = require("../Auth/auth-middleware");

router.get("/:id", mw.isOwnerOfRequest, async (req, res, next) => {
  try {
    const followers = await followersModel.getAllFollowers(req.params.id);
    res.json(followers);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/followings", mw.isOwnerOfRequest, async (req, res, next) => {
  try {
    const followings = await followersModel.getAllFollowings(req.params.id);
    res.json(followings);
  } catch (error) {
    next(error);
  }
});
router.post("/:followee_id", async (req, res, next) => {
  try {
    const follow = await followersModel.doFollow({
      follower_id: req.decodedToken.user_id,
      followee_id: req.params.followee_id,
    });
    res.json(follow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
