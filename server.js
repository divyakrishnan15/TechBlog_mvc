const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const path = require('path');

require('dotenv').config()
const hbs = exphbs.create({});

const routes = require('./controllers');
const sequelize = require('./config/connection')
const PORT = process.env.PORT || 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()) ///post empty
app.use(express.static(path.join(__dirname,'public')))
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');




// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => {
      console.log(`Tech Blog listening on port http://localhost:${PORT}`);
    })
})
