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

console.log('\n');
console.log('=====================================================');
console.log('=================     new test   ====================');
console.log('=====================================================');

describe('user & todo routes', function() {
    var test1User;
    var test1Todo;

    beforeEach(function(done){
        console.log('___________This Happens Before Each _____________');
        models.User.destroy({truncate: true});
        models.Todo.destroy({truncate: true});

        
        models.User.create({
            email: 'test1@test.com',
            password: 'test1'
            }).then(function(user){
                test1User = user;
                models.Todo.create({
                    title: 'Test 1 Todo',
                    text: '1111111. This is a test todo. I am writing a program with the MEAN Stack, but using postres instead of mongoDB.',
                        UserId: test1User.id
                }).then(function(todo){
                    test1Todo = todo;
                    console.log('_____________________________________________________________');
                    console.log('\n');
                    done();
            });
        }); 
    });

    afterEach(function(){
        console.log('\name\n')
    })



    describe('*** /', function(){
        
        it('should return 200', function(done){
            chai.request(server)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });       
        });
    });

    describe('*** POST /users', function(){
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
        it('should throw an error if invalid email is not passed', function(done){
            chai.request(server)
            .post('/users')
            .send({email: 'testtestcom'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.name.should.equal('SequelizeValidationError');
                done();
            });
        });


        it('should throw an error if email is not passed', function(done){
            chai.request(server)
            .post('/users')
            .send()
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.name.should.equal('SequelizeValidationError');
                done();
            });
            
        });
        
        it('should throw an error if password not passed', function(done){
            chai.request(server)
            .post('/users')
            .send({email: 'test4@test.com'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.name.should.equal('SequelizeValidationError');
                done();
            });
        });

    it('should throw an error if empty string is passed for password', function(done){
            chai.request(server)
            .post('/users')
            .send({email: 'test4@test.com', password: ''})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.name.should.equal('SequelizeValidationError');
                done();
            });
        });
    
    });

    describe('*** POST /users/todos/:userid', function(done){
        
        it('should create a todo item', function(done){
            chai.request(server)
            .post('/users/todos/'+test1User.id)
            .send({title: 'Test Title', text: 'test text ||| test text'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('title');
                res.body.should.have.property('text');
                res.body.should.have.property('complete');
                res.body.should.have.property('UserId');
                res.body.complete.should.equal(false);
                res.body.UserId.should.equal(test1User.id);
                done();
            });
        });
    });

    describe('*** GET /users/todos/:userid', function(){
        it('should get all todo items for user', function(done){
            chai.request(server)
            .get('/users/todos/'+test1User.id)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                done();
            });
        });
    });

    describe('*** PUT /users/todos/:todoid', function(){
        

        it('should update one todo item', function(done){
            chai.request(server)
            .put('/users/todos/'+test1Todo.id)
            .send({complete: true})
            .end(function(err, res) {
                console.log('--------Todo: ',res.body.complete)
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.complete.should.equal(true);
                done();
            });
        });


        it('should throw an error if incorrect todo id', function(done){
            chai.request(server)
            .put('/users/todos/'+001)
            .send({complete: true})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.msg.should.equal('Incorrect Todo Id.');
                done();
            }); 
        });
    });

    describe('*** DELETE /users/todos/:todoid', function(){

        it('should delete item from DB', function(done){
            chai.request(server)
            .delete('/users/todos/'+test1Todo.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.msg.should.equal('Todo deleted.');
                done();
            }); 
        });
    });

});

