const router=require('express').Router()
const {User,Post,Comment} = require('../../models')

//COMMENT GET
router.get('/',(req,res)=>{
    Comment.findAll({
        // attributes:['user_id','post_id','comment_text','created_at','updated_at'],
        attributes:['id','user_id','post_id','comment_text','created_at','updated_at'],
        include:[{
            model:User,
            // attributes:{exlude:['password']}
            attributes:['id','username','email'],
        },{
            model:Post,
            attributes:['id','title','created_at','post_content'],
        }],
    }).then((commentData)=>{
        if(!commentData){
            res.status(404).json({message:'No Comment found'})
            return
        }
        res.json(commentData)

        // const comments = postData.map(post => post.get({ plain: true }));
        // res.render('post', {
        //     comments,
        //     loggedIn: req.session.loggedIn
        //   });


    }).catch((err)=>{
        res.json(err)
    })
})


//COMMENT GET ONE
router.get('/:id',(req,res)=>{
    Comment.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','user_id','post_id','comment_text','created_at','updated_at'],
            include:{
                model:User,
                attributes:{exlude:['password']}
            },
            include:{
                model:Post,
                attributes:['id','title','created_at','post_content'],
            },
    }).then((commentData)=>{
        if(!commentData){
            res.status(404).json({message:'No Comment found'})
            return
        }
        // res.json(commentData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})


//COMMENT POST comments data----
router.post('/',(req,res)=>{
    Comment.create({
        comment_text:req.body.comment_text,
        user_id:req.body.user_id,
        post_id:req.body.post_id
    }).then((commentData)=>{
        res.json(commentData)

        
    }).catch((err)=>{
        res.status(500).json(err)
    })
})



//UPDATE COMMENTS data
router.put('/:id',(req,res)=>{
    Comment.update(req.body,{
        where:{
            id:req.params.id
        },
        attributes:['id','user_id','post_id','comment_text','created_at','updated_at'],
        // attributes:['user_id','post_id','comment_text','created_at','updated_at'],
        // include:{
        //     model:User,
        //     attributes:{exlude:['password']}
        // },
        // include:{
        //     model:Post,
        //     attributes:['id','title','created_at','post_content'],
        // },
        }).then((commentData)=>{
            if(!commentData){
                res.status(404).json({message:'No Comment found'})
                return
            }
            res.json({message:`COMMENTS data UPDATED with id = ${req.params.id}`})
        }).catch((err)=>{
            res.status(500).json(err)
    })
})


//DELETE
router.delete('/:id',(req,res)=>{
    Comment.destroy({
        where:{
            id:req.params.id
        },
        attributes:['id','user_id','post_id','comment_text','created_at','updated_at'],
    }).then((commentData)=>{
      if(!commentData){
      res.status(404).json({message:`No category was found with the ${req.params.id}`});
    return
    }
    res.json({message:`Successfully DELETED Category with id= ${req.params.id}`})
  }).catch((err)=>{
    console.log(err)
    res.status(500).json(err)
  })
});









module.exports=router





// +----+---------+---------+----------------------------+---------------------+---------------------+
// | id | user_id | post_id | comment_text               | created_at          | updated_at          |
// +----+---------+---------+----------------------------+---------------------+---------------------+
// |  1 |       1 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  2 |       2 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  3 |       3 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// +----+---------+---------+----------------------------+---------------------+---------------------+
// 3 rows in set (0.00 sec)