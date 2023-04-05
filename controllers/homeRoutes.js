const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

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

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    // attributes: ["id", "title", "body", "created_at"],
    // include: [
    // {
    // model: Comment,
    // attributes: [
    //   "id",
    //   "comment_text",
    //   "review_id",
    //   "user_id",
    //   "created_at",
    // ],
    //     include: {
    //       model: User,
    //       attributes: ["name"],
    //     },
    //   },

    // ],
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

router.get("/create-new-post", async (req, res) => {
  res.render("create-new-post", { logged_in: req.session.logged_in });
});

router.get("/edit-post/:id", async (req, res) => {
  try {
    const editPost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        // {
        //   model: Comment,
        //     include: [{model: User, attributes: ['name']}]
        // },
      ],
    });
    const post = editPost.get({ plain: true });

    res.render("edit-post", { post, logged_in: true });
  } catch (err) {
    res.status(500).json("update error");
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    
    const comment = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        // {
        //   model: Comment,
        //   include: [{ model: User, attributes: ["name"] }],
        //   attributes: ["comment"]
        // },
      ],
    });
    const newComment = comment.get({ plain: true });
    res.render("comments", {
      newComment, logged_in: true
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
