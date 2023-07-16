const router = require('express').Router()
const {User,Post,Comment}=require('../../models')


//GET
router.get('/',(req,res)=>{
    User.findAll({
        attributes:{exclude:['password']}
    }).then((userData)=>{
        if(!userData){
            res.status(404).json({message:'No User data found'})
            return
        }
        // console.log("USER DATA = ",res.json(userData))
        res.json(userData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})



//GET ONE
router.get('/:id',(req,res)=>{
    User.findOne({
        attributes:{exclude:['password']},
        where:{
            id:req.params.id
        },
        // include: [
        //     {
        //       model: Post,
        //       attributes: ['id', 'title', 'post_content', 'created_at']
        //     },
        //     {
        //         model: Comment,
        //         attributes: ['id', 'comment_text', 'created_at'],
        //         include: {
        //           model: Post,
        //           attributes: ['title']
        //         }
        //     }
        //   ]
    }).then((userData)=>{
        if(!userData){
            res.status(404).json({message:`No USER data found with id = ${req.params.id}`})
            return
        }
        res.json(userData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

module.exports=router

// +----+----------+---------------+----------+------------------+------------+
// | id | username | twitter       | github   | email            | password   |
// +----+----------+---------------+----------+------------------+------------+
// |  1 | james    | james Twitter | jamesGit | james5@gmail.com | testt12345 |
// |  2 | alex     | alex Twitter  | alex Git | alex@gmail.com   | testt12345 |
// |  3 | john     | john Twitter  | johnGit  | john@gmail.com   | testt12345 |
// +----+----------+---------------+----------+------------------+------------+
// 3 rows in set (0.02 sec)