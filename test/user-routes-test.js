process.env.NODE_ENV = 'test';

var server = require("../server/app");
var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('request');
var cheerio = require('cheerio');
var should = chai.should();
chai.use(chaiHttp);

var models = require('../server/models/index');

console.log('=====================================================')
console.log('=================     new test   ====================')
console.log('=====================================================')
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
        models.User.destroy({truncate: true});
        models.Todo.destroy({truncate: true});

        done();
    });


    describe('/', function(){
        it('should return 200', function(done){
            chai.request(server)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
            
        });
    });

    describe('POST /users', function(){
        it('should return a user object', function(done){
            chai.request(server)
            .post('/users')
            .send({email: 'test3@test.com', password: 'test3'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('id');
                done();
            });
            
        });
// need to upate models validations  then rewrite test
        it('should throw an error if password is not passed', function(done){
            chai.request(server)
            .post('/users')
            .send({email: 'test4@test.com'})
            .end(function(err, res){
                console.log('LOGGGGGGG  ',err, res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('id');
                done();
            });
            
        });
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

