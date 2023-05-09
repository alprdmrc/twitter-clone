const router = require("express").Router();
const userModel = require("../Users/users-model");
const mw = require("./auth-middleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");

router.post("/register", mw.isUserValid, async (req, res, next) => {
  try {
    let { name, password, email, role } = req.body;
    const insertedUser = await userModel.create({
      name: name,
      password: password,
      email: email,
      role: role,
    });
    res.status(201).json(insertedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", mw.loginCheck, async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        user_id: req.currentUser.user_id,
        name: req.currentUser.name,
        email: req.currentUser.email,
        role: req.currentUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: `${req.currentUser.name} geri geldi!!`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
