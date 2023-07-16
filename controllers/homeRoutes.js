const router= require('express').Router()
const sequelize=require('../config/connection')
const {Post,User, Comment}=require('../models')

router.get('/',(req,res)=>{
    // console.log("req.session = ",req.session)
    // console.log("POST RES===== ",res)
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
          ],
        include:{
            model:User,
            attributes:['username','twitter','github','email','password']
        },
        include:{
            model:Comment,
            attributes:['comment_text','created_at','updated_at']
        }
    }).then((homeData)=>{
        // console.log("homeData = ",homeData)
        if(!postData){
            res.status(404).json({message:`Post Not found`})
        }
        res.json(homeData)
        // const posts = homeData.map(post => post.get({ plain: true }));
        // res.render('homepage', {
        //     posts,
        //     // loggedIn: req.session.loggedIn
        //   });
    }).catch((err)=>{
        res.status(500).json(err)
    })
})


module.exports=router
