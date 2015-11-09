'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notNull: true,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Todo);
      }
    }
  });
  return User;
};