process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var request = require('request');
var cheerio = require('cheerio');
var should = chai.should;


var models = require('server/models/index');

describe('user & todo routes', function(){
    var testUser;
    var testTodo;

    beforeEach(function(done){
        models.User.create({
            email: 'test@test.com',
            password: 'test'
            }).then(function(user){
                testUser = user;
        });  

        models.Todo.create({
            title: 'Test Todo',
            text: 'This is a test todo. I am writing a program with the MEAN Stack, but using postres instead of mongoDB.',
            UserId: 1
        }).then(function(todo){
            testTodo = todo;
        })  

        done();
    });

    afterEach(function(done){
        // delete user and todo from DB
        models.User.destroy({}).then(function(user){
            console.log(user);
        });
        models.Todo.destroy({}).then(function(todo){
            console.log(todo);
        });

        done();
    });


});

