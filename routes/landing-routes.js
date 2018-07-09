module.exports = function(app){
    app.get('/', function(req, res){
        res.render('landing');
    });

    app.get('/saved', function(req, res){
        res.render('saved');
    });

    app.get('/saved/:id', function(req, res){
        res.render('saved')
    })

    app.get('*', function(req, res){
        res.render('landing');
    });
};