const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

require('dotenv').config()
const hbs = exphbs.create({ helpers });

const routes = require('./controllers');
const sequelize = require('./config/connection')
const PORT = process.env.PORT || 3002;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    // maxAge:300000,
    httpOnly:true,
    secure:false,
    sameSite:'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json()) ///post empty
app.use(express.static(path.join(__dirname,'public')))
app.use(routes);





// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => {
      console.log(`Tech Blog listening on port http://localhost:${PORT}`);
    })
})
