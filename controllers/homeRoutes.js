const router= require('express').Router()
const sequelize=require('../config/connection')
const {Post,User, Comment}=require('../models')
const withAuth = require('../utils/auth');


//HOMEPAGE POSTS ALLL DISPLAY
router.get('/',(req,res)=>{
    Post.findAll({
        attributes:['id','title','created_at','post_content','user_id'],
        include:{
            model:User,
            attributes:['username','twitter','github','email','password']
        },
        include:{
            model:Comment,
            attributes:['comment_text','created_at','updated_at']
        }
    }).then((postData)=>{
        if(!postData){
            res.status(404).json({message:'No Post Data found'})
            return
        }
        // res.json(postData)

        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
        
    }).catch((err)=>{
        res.status(500).json(err)
    })
})


//SINGLE POST

router.get('/posts/:id',(req,res)=>{
  Post.findOne({
      attributes:['id','title','created_at','post_content','user_id'],
      where:{
          id:req.params.id
      },
      include:{
          model:User,
          attributes:['username','twitter','github','email','password','created_at','updated_at']
      },
      include:{
          model:Comment,
          attributes:['comment_text','created_at','updated_at']
      }
  }).then((postData)=>{
      if(!postData){
          res.status(404).json({message:'No Post Data found'})
          return
      }
      // res.json(postData)



    const dashboard = postData.get({ plain: true });
    res.render('dashboard', { dashboard, loggedIn: req.session.loggedIn });


      

  }).catch((err)=>{
      res.status(500).json(err)
  })
})



//DASHBOARD COMMENTS
router.get('/dashboard',(req,res)=>{
  Comment.findAll({
      attributes:['id','title','created_at','post_content','user_id'],
      include:{
          model:User,
          attributes:['username','twitter','github','email','password']
      },
      include:{
          model:Comment,
          attributes:['comment_text','created_at','updated_at']
      }
  }).then((commentData)=>{
      if(!commentData){
          res.status(404).json({message:'No Post Data found'})
          return
      }
      // res.json(postData)
      
      const comment = commentData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        comment,
          loggedIn: req.session.loggedIn
        });
      
  }).catch((err)=>{
      res.status(500).json(err)
  })
})





// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });




module.exports=router
