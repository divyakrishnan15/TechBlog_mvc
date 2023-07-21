const router = require('express').Router()
const path = require('path')
const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')

router.use('/',homeRoutes)
// router.use('/login',homeRoutes)
// router.use('/comment',homeRoutes)
router.use('/api',apiRoutes)



// router.get('/',(req,res)=>{
//   // res.render('booking/booking_provider')
//   res.sendFile(path.join(__dirname,'/../views/layouts/homepage.html'))
// })

// router.get('/dashboard',(req,res)=>{
//   // res.render('booking/booking_provider')
//   res.sendFile(path.join(__dirname,'/../views/layouts/dashboard.html'))
// })

// router.get('/edit',(req,res)=>{
//   // res.render('booking/booking_provider')
//   res.sendFile(path.join(__dirname,'/../views/layouts/edit.html'))
// })

// router.get('/login',(req,res)=>{
//   // res.render('booking/booking_provider')
//   res.sendFile(path.join(__dirname,'/../views/layouts/login.html'))
// })

// router.use((req, res) => {
//     res.status(404).end();
//   });

module.exports=router