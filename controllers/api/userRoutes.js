const router = require("express").Router();
const { User } = require("../../models");

//we are at /api/users
//Post route to signup new user
router.post("/signup", async (req, res) => {
  
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      req.session.name = userData.name;

      res.status(200).json(userData);
    });
   
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post route to login a user
router.post("/login", async (req, res) => {
  
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });


    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      res.status(200).json({ user: userData, message: 'You are now logged in!' })
    });

      
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post route to logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
