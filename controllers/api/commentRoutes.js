const router=require('express').Router()
const {User,Post,Comment} = require('../../models')

//COMMENT GET
router.get('/',(req,res)=>{
    Comment.findAll({
        attributes:['user_id','post_id','comment_text','created_at','updated_at'],
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
        res.json(commentData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

module.exports=router





// +----+---------+---------+----------------------------+---------------------+---------------------+
// | id | user_id | post_id | comment_text               | created_at          | updated_at          |
// +----+---------+---------+----------------------------+---------------------+---------------------+
// |  1 |       1 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  2 |       2 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// |  3 |       3 |       1 | this is my first blog post | 2023-07-27 00:00:00 | 2023-07-28 00:00:00 |
// +----+---------+---------+----------------------------+---------------------+---------------------+
// 3 rows in set (0.00 sec)