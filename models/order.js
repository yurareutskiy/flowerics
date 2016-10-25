'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    paid: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'delivered', 'canceled', 'ready'],
      defaultValue: 'pending'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Order;
};
