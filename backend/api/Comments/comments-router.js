const router = require("express").Router();
const commentsModel = require("./comments-model");
const auth_mw = require("../Auth/auth-middleware");
const comment_mw = require("./comments-middleware");

router.get("/", auth_mw.openTo("admin"), async (req, res, next) => {
  try {
    const comments = await commentsModel.gelAll();
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/:tweet_id", comment_mw.isTweetExist, async (req, res, next) => {
  try {
    const comments = await commentsModel.getTweetComments(req.params.tweet_id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/:tweet_id", comment_mw.isTweetExist, async (req, res, next) => {
  try {
    let comment = {
      user_id: req.decodedToken.user_id,
      tweet_id: req.params.tweet_id,
      reply: req.body.reply,
    };
    const postedComment = await commentsModel.postComment(comment);
    res.json(postedComment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
