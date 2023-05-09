const db = require("../../data/db-config");

const getAll = async () => {
  const allUsers = await db("Users").select("user_id as id", "name", "email"); // returns[]
  return allUsers;
};

const getById = async (id) => {
  const user = await db("Users")
    .select("user_id as id", "name", "email")
    .where({ user_id: id })
    .first(); // returns{}
  return user;
};

const getBy = async (filter) => {
  const users = await db("Users").where(filter); // returns[]
  return users;
};

const create = async (user) => {
  const [insertedId] = await db("Users").insert(user);
  const [insertedUser] = await getBy({ user_id: insertedId });
  return insertedUser; // returns{}
};

module.exports = {
  getAll,
  getById,
  getBy,
  create,
};
