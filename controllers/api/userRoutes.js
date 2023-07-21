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


//User POST USER data-----
router.post('/',(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        twitter:req.body.twitter,
        github:req.body.github,
    }).then((userData)=>{
        req.session.save(() => {
            req.session.loggedIn = true;
        }) 
        res.json(userData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})


//UPDATE USER data------
router.put('/:id',(req,res)=>{
    User.update(req.body,{
        where:{
            id:req.params.id
        },
        attributes:{exclude:['password']},
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
        res.json({message:`USER data UPDATED with id = ${req.params.id}`})
    }).catch((err)=>{
        res.status(500).json(err)
    })
})



//DELETE
router.delete('/:id',(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        },
    }).then((userData)=>{
      if(!userData){
      res.status(404).json({message:`No category was found with the ${req.params.id}`});
    return
    }
    res.json({message:`Successfully DELETED Category with id= ${req.params.id}`})
  }).catch((err)=>{
    console.log(err)
    res.status(500).json(err)
  })
});


// Login
// router.post('/login', async (req, res) => {
//     try {
//       const dbUserData = await User.findOne({
//         where: {
//           email: req.body.email,
//         },
//       });
  
//       if (!dbUserData) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password. Please try again!' });
//         return;
//       }
  
//       const validPassword = await dbUserData.checkPassword(req.body.password);
  
//       if (!validPassword) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password. Please try again!' });
//         return;
//       }
  
//       req.session.save(() => {
//         req.session.loggedIn = true;
//         console.log(
//           '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
//           req.session.cookie
//         );
  
//         res
//           .status(200)
//           .json({ user: dbUserData, message: 'You are now logged in!' });
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  

  
//   // Logout
//   router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
//   });
  

router.post('/login', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this method
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});




router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // TODO: Add a comment describing the functionality of this method
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports=router






// +----+----------+---------------+----------+------------------+------------+
// | id | username | twitter       | github   | email            | password   |
// +----+----------+---------------+----------+------------------+------------+
// |  1 | james    | james Twitter | jamesGit | james5@gmail.com | testt12345 |
// |  2 | alex     | alex Twitter  | alex Git | alex@gmail.com   | testt12345 |
// |  3 | john     | john Twitter  | johnGit  | john@gmail.com   | testt12345 |
// +----+----------+---------------+----------+------------------+------------+
// 3 rows in set (0.02 sec)