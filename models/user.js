'use strict';
const { encrypt } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, option) {
        user.password = encrypt(user.password);
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};