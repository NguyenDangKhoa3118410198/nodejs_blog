const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('../src/config/db');

db.connect();

// app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
