'use strict';

/**
* CANDIDATE MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Candidate = sequelize.define('Candidate', {
    id : {
      type          : DataTypes.BIGINT,
      primaryKey    : true,
      autoIncrement : true
    },
    address : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    name : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    first : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    age : {
      type      : DataTypes.BIGINT,
      allowNull : false
    },
    picture : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    job : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    slogan : {
      type      : DataTypes.STRING,
      allowNull : true
    },
    program : {
      type : DataTypes.TEXT,
      allowNull : true
    },
    programfile : {
      type : DataTypes.STRING,
      allowNull : true
    },
    valid : {
      type         : DataTypes.BOOLEAN,
      allowNull    : false,
      defaultValue : 0
    }
  });

  /** Class Methods */

  Candidate.associate = function (models) {

    Candidate.belongsTo( models.Political );
  }

  /** Instance Methods */

  Candidate.prototype.responsify = function () {
    let result  = {};

    result.id          = this.id;
    result.address     = this.id;
    result.name        = this.name;
    result.first       = this.first;
    result.age         = this.age;
    result.picture     = this.picture;
    result.job         = this.job;
    result.slogan      = this.slogan;
    result.program     = this.program;
    result.programfile = this.programfile;
    result.description = this.description;

    if( this.Political ) result.political = this.Political;

    return result;
  }

  return Candidate;
};
