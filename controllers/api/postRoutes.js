const router = require('express').Router()
const {User,Post,Comment}=require('../../models')

//POST GET
router.get('/',(req,res)=>{
    Post.findAll({
        attributes:['id','title','created_at','post_content'],
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
        res.json(postData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

router.get('/:id',(req,res)=>{
    Post.findOne({
        attributes:['id','title','created_at','post_content'],
        where:{
            id:req.params.id
        },
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
        res.json(postData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

module.exports=router


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