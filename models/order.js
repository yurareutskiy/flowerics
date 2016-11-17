'use strict';

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    comment: DataTypes.STRING,
    date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'delivered', 'canceled', 'ready'],
      defaultValue: 'pending'
    },
    delivery_type: {
      type: DataTypes.ENUM,
      values: ['delivery', 'ex_works']
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
        Order.belongsTo(models.Bouquet, {
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
