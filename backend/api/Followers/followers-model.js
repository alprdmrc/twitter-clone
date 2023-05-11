const db = require("../../data/db-config");

const getAllFollowers = async (id) => {
  const followers = await db("Followers as f")
    .leftJoin("Users as u", "f.followee_id", "u.user_id")
    .leftJoin("Users as fl", "f.follower_id", "fl.user_id")
    .select(
      "u.name as name",
      "u.user_id",
      "fl.name as follower",
      "fl.user_id as fl_user_id"
    )
    // .select("")
    .where({ followee_id: id });

  let followersModel = {
    user_id: followers[0].user_id,
    name: followers[0].name,
    followers: [],
  };
  const formattedFollowers = followers.reduce((acc, follower) => {
    acc.followers.push({
      name: follower.follower,
      user_id: follower.fl_user_id,
    });
    return acc;
  }, followersModel);

  return formattedFollowers;
};

const doFollow = async (follow) => {
  const followObj = await db("Followers").insert(follow);
  return followObj;
};

const getAllFollowings = async (id) => {
  const followings = await db("Followers as f")
    .leftJoin("Users as u", "f.follower_id", "u.user_id")
    .leftJoin("Users as fe", "f.followee_id", "fe.user_id")
    .select(
      "u.name as name",
      "u.user_id",
      "fe.name as following",
      "fe.user_id as fe_user_id"
    )
    .where({ follower_id: id });

  if (!followings || !followings.length > 0) {
    return [];
  } else {
    let followingsModel = {
      user_id: followings[0].user_id,
      name: followings[0].name,
      followings: [],
    };
    const formattedFollowings = followings.reduce((acc, following) => {
      acc.followings.push({
        name: following.following,
        user_id: following.fe_user_id,
      });
      return acc;
    }, followingsModel);
    return formattedFollowings;
  }
};

module.exports = { getAllFollowers, getAllFollowings, doFollow };
