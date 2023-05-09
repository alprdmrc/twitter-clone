const userModel = require("../Users/users-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config.js");

//role required
const openTo = (role) => (req, res, next) => {
  try {
    if (role !== req.decodedToken.role) {
      res.status(401).json({ message: "Izinsiz giris" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

//token required
const restricted = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).json({ message: "Token gecersizdir" });
        } else {
          req.decodedToken = decode;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

//register
const isUserValid = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    let isExist = await userModel.getBy({ email: email });
    if (name.trim().length < 3) {
      res.status(401).json({ message: "Kullanici adi hatali" });
      return;
    } else if (isExist && isExist.length > 0) {
      res.status(401).json({ message: "Bu email kullaniliyor" });
      return;
    } else {
      req.body.password = bcryptjs.hashSync(req.body.password);
      next();
    }
  } catch (error) {
    next(error);
  }
};

//login
const loginCheck = async (req, res, next) => {
  try {
    let { password, email } = req.body;
    let user = await userModel.getBy({ email: email });
    let isValidLogin =
      user &&
      user.length > 0 &&
      bcryptjs.compareSync(password, user[0].password);
    if (!isValidLogin) {
      res.status(401).json({ message: "Gecersiz kriter" });
    } else {
      req.currentUser = user[0];
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginCheck,
  isUserValid,
  restricted,
  openTo,
};
