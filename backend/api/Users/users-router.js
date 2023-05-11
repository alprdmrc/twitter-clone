const router = require("express").Router();
const userModel = require("./users-model");
const auth_mw = require("../Auth/auth-middleware");

router.get("/", auth_mw.openTo(["Admin"]), async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth_mw.isOwnerOfRequest, async (req, res, next) => {
  try {
    const user = await userModel.getById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
