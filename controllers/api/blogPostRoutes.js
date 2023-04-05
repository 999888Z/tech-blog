const router = require('express').Router();
const { Post } = require('../../models');

router.post("/create-new-post", async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id 
        })

        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put("/update-post/:id", async (req, res) => {
    // console.log(req.body.title, req.body.body)
    console.log("hello there")
    try {
        const updatePost = await Post.update({
            title: req.body.title, 
            body: req.body.body,
            
        }, 
    {
            where: {
                id: req.params.id
        }}
        )
        res.json(updatePost)
        
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/delete/:id", async (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json("deleted")
 
})




module.exports = router;