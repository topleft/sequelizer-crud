'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { 
          notEmpty: true
        }
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
