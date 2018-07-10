// ==================
// || REQUIREMENTS ||
// ==================

const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

// ============
// || EXPORT ||
// ============

module.exports = function(app){

    // =============
    // || SCRAPER ||
    // =============

    app.get('/scrape', function(req, res) {
        axios.get('http://www.npr.org/').then(function(response) {
            const $ = cheerio.load(response.data);
            $('.story-text').each(function(i, element) {
                const result = {};
                result.title = $(this).children('a').children('h3').text();
                result.link = $(this).children('a').attr('href');
                db.Article.create(result).then(function(dbArticle) {
                    console.log(dbArticle);
                }).catch(function(err) {
                    return res.json(err);
                });
            });      
            res.send('scrape complete');
        });
    });
    
    // ======================
    // || LANDING ARTICLES ||
    // ======================

    app.get('/articles', function(req, res) {
        db.Article.findAll({}).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // ===============
    // || LOAD NOTE ||
    // ===============

    app.get('/articles/:id', function(req, res) {
        db.Article.findOne({_id: req.params.id}).populate('note').then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // =================
    // || CREATE NOTE ||
    // =================

    app.post('/article/:id', function(req, res) {
        db.Note.create(req.body).then(function(dbNote) {
            return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
        }).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // ===================
    // || LANDING ROUTE ||
    // ===================

    app.get('/', function(req, res){
        res.render('landing');
    });

    // =================
    // || SAVED ROUTE ||
    // =================

    app.get('/saved', function(req, res){
        res.render('saved');
    });

    // =====================
    // || EVERYTHING ELSE ||
    // =====================

    app.get('*', function(req, res){
        res.render('landing');
    });

};