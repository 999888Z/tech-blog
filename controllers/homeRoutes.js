const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Render homepage 
router.get("/", async (req, res) => {
  try {
    const blogPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const renderBlog = blogPost.map((one) => one.get({ plain: true }));
  
    res.render("homepage", { renderBlog, logged_in: req.session.logged_in });
  } catch (error) {
    console.log(error)
  }
  
});

//Render login page
router.get("/login", async (req, res) => {
  res.render("login");
});

//Render signup page
router.get("/signup", async (req, res) => {
  res.render("signup");
});

//Render dashboard page
router.get("/dashboard", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
 
  })
    .then((postData) => {
      const post = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", { post, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Render a newly created post page
router.get("/create-new-post", async (req, res) => {
  res.render("create-new-post", { logged_in: req.session.logged_in });
});

//Render the edit post page
router.get("/edit-post/:id", async (req, res) => {
  try {
    const editPost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        
      ],
    });
    const post = editPost.get({ plain: true });

    res.render("edit-post", { post, logged_in: true });
  } catch (err) {
    res.status(500).json("update error");
  }
});

//Render the comments page
router.get("/comments/:id", async (req, res) => {
  try {
    
    const comment = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
          
        },
      ],
    });
    const newComment = comment.get({ plain: true });
    res.render("comments", {
      newComment, logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
