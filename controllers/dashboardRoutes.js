const router = require('express').Router()
const {Post,Comment,User}= require('../models')

router.get("/", (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect("/");
    //   return;
    // }
    
    if(req.session.user_session_data){
      Post.findAll({
        attributes: ["id", "title", "created_at", "post_content", "user_id"],
        where: {
          user_id: req.session.user_session_data.user_id,
        },
        include: [{
          model: User,
          attributes: ["username", "email"],
        },{
          model: Comment,
          attributes: ["comment_text", "created_at", "updated_at"],
        }]
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
            user_session_data: req.session.user_session_data,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }else{
      res.render("not_logged_in", {
        user_session_data: req.session.user_session_data,
      })
    }
  
  });



  
router.get("/update/:id", (req, res) => {
  
    Post.findOne({
      attributes: ["id", "title", "created_at", "post_content", "user_id"],
      where: {
        id: req.params.id,
      },
      include: [{
        model: User,
        attributes: ["username", "email"],
      },{
        model: Comment,
        attributes: ["id","comment_text", "created_at", "updated_at"],
      }]
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
          user_session_data: req.session.user_session_data,
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
      include: [{
        model: User,
        attributes: ["username", "email"],
      },{
        model: Comment,
        attributes: ["id","comment_text", "created_at", "updated_at"],
      }]
    })
      .then((userPostDeleteData) => {
        if (!userPostDeleteData) {
          res.status(404).json({ message: "No Post Data found" });
          return;
        }
        // res.json(postData)

        // console.log()
  
        const delposts = userPostDeleteData.get({ plain: true });
        res.render("delete", {
          delposts,
          user_session_data: req.session.user_session_data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  
  });

  
  module.exports = router