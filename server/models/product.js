'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value < 0) {
            throw new Error("Has to be greater or equal to 0");
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value < 0) {
            throw new Error("Has to be greater or equal to 0");
          }
        }
      }
    }
  }, {});
  Product.associate = function (models) {
    Product.belongsToMany(models.Customer, { through: 'Cart', foreignKey: 'ProductId' })
    Product.hasMany(models.Cart)
    // associations can be defined here
  };
  return Product;
};




