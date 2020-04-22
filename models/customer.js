'use strict';
const { encrypt } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(customer, option) {
        customer.password = encrypt(customer.password);
      }
    }
  });
  Customer.associate = function (models) {
    Customer.belongsToMany(models.Product, { through: 'Cart', foreignKey: 'CustomerId' })
    Customer.hasMany(models.Cart)
    // associations can be defined here
  };
  return Customer;
};