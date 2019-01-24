'use strict';

/**
* POLITICAL MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Political = sequelize.define('Political', {
    id : {
      type          : DataTypes.BIGINT,
      primaryKey    : true,
      autoIncrement : true
    },
    name : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    position : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    color : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    picture : {
      type      : DataTypes.STRING,
      allowNull : false
    }
  });

  /** Instance Methods */

  Political.prototype.responsify = function () {
    let result  = {};

    result.id       = this.id;
    result.name     = this.name;
    result.position = this.first;
    result.color    = this.job;
    result.picture  = this.picture;

    return result;
  }

  return Political;
};
