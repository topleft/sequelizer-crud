

create .sequelizerc in root

```
var path = require('path');

module.exports = {
  'config': path.resolve('./server', 'config.json'),
  'migrations-path': path.resolve('./server', 'migrations'),
  'models-path': path.resolve('./server', 'models'),
  'seeders-path': path.resolve('./server', 'seeders')
}
``` 

this establishes the file paths and folder names that we need, they are created when we run the `init` command.

dang!!! look at that sweet index.js file that squelize created, thanks to the boilerplate gods



#### Create Database
remember to use `dbcreate` in the beginning to create each database (development and test)



#### Create each module
node_modules/.bin/sequelize create:module --name <name> --attributes 'comma seperated value:key pairs'

### Before you Migrate!

go to the migration file and the model file for each model and update the schema with any new fields or options on the attributes ie allowNull: false, etc more on options and validation [here](http://docs.sequelizejs.com/en/latest/docs/models-definition/#validations)

### Migrate

`sequelize db:migrate` 
`sequelize db:migrate --env test` 

default env is 'development'

we now have two databases set up with the same models. remember, when you execute migrations, do it on both databases. 

??? sequelize.sync() ???

### A note about migrations 

I came from learning on non relational DB's and was really confused about migrations at first. Here's the short and dirty:

* migration files are like version control

need another field in your model? adding a new attribute...

node_modules/.bin/sequelize create:migration --name <file-name>


### OPtions and Variables

there are options that are declared in the field object (allowNull, unique...), others need to be inside validate: {}.

### in the routes

to catch validation errors, use the `.then().catch()` syntax in the post route for that schema, the validators will send an error if conditions aren't met.

### error handling, how to

I would like to write up some details on error handling basics, where they are sent. to the user or to the console, how to elegantly tell the user they need to try again etc.


