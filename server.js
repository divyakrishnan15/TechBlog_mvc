const express = require('express');
const routes = require('./controllers');
require('dotenv').config()
const sequelize = require('./config/connection')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()) ///post empty
app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => {
      console.log(`Tech Blog listening on port http://localhost:${PORT}`);
    })
})
