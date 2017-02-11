'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paid: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      promocode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'delivered', 'canceled', 'ready']
      },
      delivery_type: {
        type: Sequelize.ENUM,
        values: ['delivery', 'ex_works']
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER
      },
      bouquetId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
