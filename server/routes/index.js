var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res) {
    models.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function(user){
        res.json(user);
    });
}); 

router.post('/users/todos/:userid', function(req, res) {
    models.Todo.create({
        title: req.body.title,
        text: req.body.text,
        UserId: req.params.userid
    }).then(function(user){
        res.json(user);
    });
}); 



router.get('/users/todos/:userid', function(req, res) {
    models.Todo.findAll({
        where: {
            UserId: req.params.userid 
        }
    }).then(function(todos){
        res.json(todos);
    });
});

router.put('/users/todos/:todoid', function(req, res) {
    models.Todo.find({
        where: {
            id: req.params.todoid 
        }
    }).then(function(todo){
        if (todo) {
            todo.updateAttributes({
                title: req.body.title,
                text: req.body.text,
                complete: req.body.complete
            }).then(function(todo){
                res.json(todo);
            });
        }
    });
});

router.delete('/users/todos/:todoid', function(req, res) {
    models.Todo.destroy({
        where: {
            id: req.params.todoid 
        }
    }).then(function(todo){
        res.json(todo);
    });
});



module.exports = router;
