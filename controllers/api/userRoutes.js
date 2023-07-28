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





//UPDATE USER data------
router.put('/:id',(req,res)=>{
    User.update(req.body,{
        where:{
            id:req.params.id
        },
        attributes:{exclude:['password']},
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


//User POST USER data-----
router.post('/',(req,res)=>{
  console.log("user sign up route - ",req.body)

    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then((userData)=>{

        // req.session.save(() => {
        //   req.session.username = userData.id,
        //   req.session.email = userData.id,
        //   req.session.user_session_data = true;
        // }) 

        req.session.user_session_data = {
          username: userData.username,
          user_id: userData.id
        }
        console.log(req.session.user_session_data)
        res.json(userData)
        console.log('sign up .then =',userData)

    }).catch((err)=>{
        res.json(err)
    })
})

router.post('/login', (req, res) => {
  
  User.findOne({ 
    where: { email: req.body.email } 
  }).then((loginData)=>{
    if (!loginData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again /or SIGN UP' });
      return;
    }

    const validPassword = loginData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.user_session_data = {
      username: loginData.username,
      user_id: loginData.id
    }
      
      res.json({ user: loginData, message: 'You are now logged in!' });
    

  }).catch((err)=> {
  res.status(400).json(err);
})
})



router.post('/logout', (req, res) => {
  if (req.session.user_session_data) {
    delete req.session.user_session_data;
    res.json("logout SUCCESS")
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