process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var request = require('request');
var cheerio = require('cheerio');
var should = chai.should;


var models = require('../server/models/index');

describe('user & todo routes', function() {
    var test1User;
    var test2User;
    var testTodo;

    beforeEach(function(done){
        models.User.create({
            email: 'test1@test.com',
            password: 'test1'
            }).then(function(user){
                test1User = user;
        });  
        models.User.create({
            email: 'test2@test.com',
            password: 'test2'
            }).then(function(user){
                test2User = user;
        });  

        models.Todo.create({
            title: 'Test 1 Todo',
            text: '1111111. This is a test todo. I am writing a program with the MEAN Stack, but using postres instead of mongoDB.',
            UserId: 1
        }).then(function(todo){
            testTodo = todo;
        });

        models.Todo.create({
            title: 'Test 2 Todo',
            text: '2222222. This is a test 2 todo. I am using sequelize which is an ORM.',
            UserId: 1
        }).then(function(todo){
            testTodo = todo;
        });  

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

    describe('POST /users', function(){
        it('should return a user object');
        it('should create a user in the DB');
        it('should throw an error if email or password are not passed');
    });

    describe('POST /users/todos/:userid', function(){
        it('should create a todo item');
        it('should throw an error if no title');
        it('should throw an error if incorrect user id');
    });

    describe('GET /users/todos/:userid', function(){
        it('should get all todo items for user');
        it('should throw an error if incorrect user id');
    });

    describe('GET /users/todos/:todoid', function(){
        it('should check to see if current user owns item');
        it('should get one todo item');
        it('should throw an error if incorrect todo id');
    });

    describe('PUT /users/todos/:todoid', function(){
        it('should check to see if current user owns item');
        it('should update title');
        it('should update text');
        it('should update complete boolean');
    });

    describe('DELETE /users/todos/:todoid', function(){
        it('should check to see if current user owns item');
        it('should delete item from DB');
    });

});

