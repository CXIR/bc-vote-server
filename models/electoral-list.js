'use strict';

/**
* POLITICAL MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const ElectoralList = sequelize.define('ElectoralList', {
    id : {
      type          : DataTypes.BIGINT,
      primaryKey    : true,
      autoIncrement : true
    },
    name : {
      type      : DataTypes.STRING,
      allowNull : false
    }
  });

ElectoralList.associate = function (models) {

  ElectoralList.belongsToMany( models.Candidate, { through : 'ElectoralListCandidates', foreignKey : 'ElectoralListId', as : 'Candidates' } );
  ElectoralList.belongsTo(     models.Candidate, { as : 'ListHead' } );
}

  /** Instance Methods */

  ElectoralList.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;

    if( this.Candidate ) result.candidate = this.candidate;

    return result;
  }

  return ElectoralList;
};
