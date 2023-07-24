const router = require('express').Router()
const path = require('path')
const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes')

router.use('/',homeRoutes)
router.use('/dashboard',dashboardRoutes)
router.use('/api',apiRoutes)


// router.use('/login',homeRoutes)
// router.use('/comment',homeRoutes)



// router.get('/',(req,res)=>{
//   // res.render('booking/booking_provider')
//   res.sendFile(path.join(__dirname,'/../views/layouts/homepage.html'))
// })


module.exports=router