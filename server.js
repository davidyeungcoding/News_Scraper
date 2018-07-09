// ==================
// || REQUIREMENTS ||
// ==================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');

// ====================
// || INITIALIZATION ||
// ====================

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// ======================
// || STATIC DIRECTORY ||
// ======================

app.use(express.static('public'));

// ================
// || HANDLEBARS ||
// ================

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ================
// || CONNECTION ||
// ================

const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// ============
// || ROUTES ||
// ============

require('./routes/landing-routes.js')(app);

// ==========
// || SYNC ||
// ==========

app.listen(PORT, function(){
    console.log(`App running on port: ${PORT}`)
});