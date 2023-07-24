const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { update } = require("../../models/User");

//POST GET
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "created_at", "post_content", "user_id"],
    include: {
      model: User,
      attributes: ["username", "twitter", "github", "email"],
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
      res.json(postData);

      // const post = postData.get({ plain: true });

      // res.render('post', { post });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    attributes: ["id", "title", "created_at", "post_content", "user_id"],
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
      attributes: [
        "username",
        "twitter",
        "github",
        "email",
        "password",
        "created_at",
        "updated_at",
      ],
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
      res.json(postData);

      // const post = postData.get({ plain: true });
      // res.render('post', { post });
      // res.render('post', {
      //     post,
      //     loggedIn: req.session.loggedIn
      //   });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//POST ROUTER --- POST
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.body.user_id,
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//UPDATE POST
router.put("/:id", (req, res) => {
  console.log(req.body)
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
    // attributes:['id','title','created_at','post_content','user_id'],
    // include:{
    //     model:User,
    //     attributes:['username','twitter','github','email','password','created_at','updated_at']
    // },
    // include:{
    //     model:Comment,
    //     attributes:['comment_text','created_at','updated_at']
    // }
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No Post Data found" });
        return;
      }
      res.json({ message: `POST data UPDATED with id = ${req.params.id}` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE POST ROUTE
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res
          .status(404)
          .json({ message: `No category was found with the ${req.params.id}` });
        return;
      }
      res.json({
        message: `Successfully DELETED Category with id= ${req.params.id}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// +----+---------------+------------------------------------------------------------------+---------+---------------------+---------------------+
// | id | title         | post_content                                                     | user_id | created_at          | updated_at          |
// +----+---------------+------------------------------------------------------------------+---------+---------------------+---------------------+
// |  1 | javascript    | hi.. <script>abc.js</script>                                     |       1 | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  2 | nodes express | bye..                                                            |       1 | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  3 | reactjs       | hello.. import React from .react                                 |       1 | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  4 | javascript    | hi.. <code><h1>abc.js</h1></code>                                |       1 | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  5 | javascript    | const add = (a,b) => {
//     return a + b
// }

// console.log(add(1,2)) |       1 | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// +----+---------------+------------------------------------------------------------------+---------+---------------------+---------------------+
// 5 rows in set (0.00 sec)
