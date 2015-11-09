'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { 
          isEmail: true
        }
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};

