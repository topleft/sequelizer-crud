why is this in the _models/index.js_?

```
db.sequelize = sequelize;
db.Sequelize = Sequelize;
```


setting up a test database:


#### Create Database
remember to use `dbcreate` in the beginning to create each database (development and test)


#### Create each module
node_modules/.bin/sequelize create:module --name <name> --attributes 'comma seperated value:key pairs'









sync? Is this done once? only after we have our models and associations set up?

migration files are like version control



adding a new attribute to a schema...

node_modules/.bin/sequelize create:migration

there are some 'validations' that are stand alone, others need to be inside validate: {}.

to catch validation errors, use the `.then().catch()` syntax in the post route for that schema


