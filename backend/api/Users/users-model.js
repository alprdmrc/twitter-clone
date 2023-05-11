const db = require("../../data/db-config");
const followersModel = require("../Followers/followers-model");

const getAll = async () => {
  const allUsers = await db("Users").select(
    "user_id as id",
    "name",
    "email",
    "role"
  ); // returns[]
  return allUsers;
};

const getById = async (id) => {
  const user = await db("Users as u")
    .select("user_id as id", "name", "email", "role")
    .where({ user_id: id })
    .first(); // returns{}
  const followers = await followersModel.getAllFollowers(id);
  const followings = await followersModel.getAllFollowings(id);
  user.followings = followings.followings;
  user.followers = followers.followers;
  return user;
};

const getBy = async (filter) => {
  const users = await db("Users").where(filter); // returns[]
  return users;
};

const create = async (user) => {
  const [insertedId] = await db("Users").insert(user);
  const [insertedUser] = await getBy({ user_id: insertedId });
  delete insertedUser.password;
  return insertedUser; // returns{}
};

module.exports = {
  getAll,
  getById,
  getBy,
  create,
};
