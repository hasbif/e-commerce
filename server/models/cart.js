'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  Cart.associate = function (models) {
    Cart.belongsTo(models.Customer)
    Cart.belongsTo(models.Product)
    // associations can be defined here
  };
  return Cart;
};