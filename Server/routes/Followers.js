const express = require("express");
const router = express.Router();
const { Followers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  // const postId = req.params.postId;
  // const comments = await Comments.findAll({ where: { PostId: postId } });
  const { username } = req.body;

  const UserId = await Followers.findAll({
    // where: { username: username },
  });
  res.json(UserId);
});



router.post("/", validateToken, async (req, res) => {
  // const comment = req.body;
  // const username = req.user.username;
  const { username } = req.body;
  const UserId = req.user.id;
  // comment.username = username;
  // await Comments.create(comment);
  // res.json(comment);

  const found = await Followers.findOne({
    where: { username: username, UserId: UserId },
  });
  if (!found) {
    await Followers.create({ username: username, UserId: UserId });
    res.json({ followed: true });
  } else {
    await Followers.destroy({
      where: { username: username, UserId: UserId },
    });
    res.json({ followed: false });
  }

  // await Followers.create({ username : username , UserId: UserId });
  // res.json("success");
});

// router.post("/", validateToken, async (req, res) => {
//   const { PostId } = req.body;
//   const UserId = req.user.id;

//   const found = await Likes.findOne({
//     where: { PostId: PostId, UserId: UserId },
//   });
//   if (!found) {
//     await Likes.create({ PostId: PostId, UserId: UserId });
//     res.json({ liked: true });
//   } else {
//     await Likes.destroy({
//       where: { PostId: PostId, UserId: UserId },
//     });
//     res.json({ liked: false });
//   }
// });

module.exports = router;
