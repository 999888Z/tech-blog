const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


//This route creates new posts
router.post("/create-new-post", async (req, res) => {
  try {
    const newPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//This updates a particular post
router.put("/update-post/:id", async (req, res) => {
  
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//This deletes a particular post
router.delete("/delete/:id", async (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json("deleted");
});

//This adds a comment to a particular post
router.post("/add-comment", async (req, res) => {
  
  try {
    const newCommentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
    
    res.status(200).json(newCommentData);
  } catch (err) {
    
    res.status(500).json(err);
  }
});

module.exports = router;
