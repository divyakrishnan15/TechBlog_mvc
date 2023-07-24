const router = require('express').Router()
const {Post,Comment,User}= require('../models')

router.get("/", (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect("/");
    //   return;
    // }
  
    Post.findAll({
      attributes: ["id", "title", "created_at", "post_content", "user_id"],
      where: {
        user_id: 1,
      },
      include: {
        model: User,
        attributes: ["username", "twitter", "github", "email", "password"],
      },
      include: {
        model: Comment,
        attributes: ["comment_text", "created_at", "updated_at"],
      },
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: "No Post Data found" });
          return;
        }
        // res.json(postData)
  
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
          posts,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  
  });



  
router.get("/update/:id", (req, res) => {
  
    Post.findOne({
      attributes: ["id", "title", "created_at", "post_content", "user_id"],
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ["username", "twitter", "github", "email", "password"],
      },
      include: {
        model: Comment,
        attributes: ["comment_text", "created_at", "updated_at"],
      },
    })
      .then((userPostUpdateData) => {
        if (!userPostUpdateData) {
          res.status(404).json({ message: "No Post Data found" });
          return;
        }
        // res.json(postData)
  
        const editposts = userPostUpdateData.get({ plain: true });
        res.render("edit", {
          editposts,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  
  });



  router.get("/delete/:id", (req, res) => {
  
    Post.findOne({
      attributes: ["id", "title", "created_at", "post_content", "user_id"],
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ["username", "twitter", "github", "email", "password"],
      },
      include: {
        model: Comment,
        attributes: ["comment_text", "created_at", "updated_at"],
      },
    })
      .then((userPostDeleteData) => {
        if (!userPostDeleteData) {
          res.status(404).json({ message: "No Post Data found" });
          return;
        }
        // res.json(postData)
  
        const delposts = userPostDeleteData.get({ plain: true });
        res.render("delete", {
          delposts,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  
  });

  
  module.exports = router