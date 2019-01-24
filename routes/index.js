var express = require('express');
var router  = express.Router();

const models    = require('../models');
const sequelize = require('sequelize');
const Op        = sequelize.Op;

/************************************ GET *************************************/

/* GET home page */
router.get('/', function(req, res, next) {

});

/* GET candidates */
router.get('/candidates', function(req, res, next) {

  models.Candidate.findAll({
    include : [ { model : models.Political, as : 'Medias' } ]
  })
  .then( candidates => {

    if (candidates) {

      let results = [];

      for (let candidat in candidates) {

        results.push(candidate.responsify());
      }
      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'No Candidate found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err  }); });

});

/* GET politicals */
router.get('/politicals', function(req, res, next) {

  models.Political.findAll({

  })
  .then( politicals => {

    if (candidates) {

      let results = [];

      for (let political in politicals) {

        results.push(political.responsify());
      }
      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'No Political found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err  }); });

});

/* GET lists */
router.get('/lists', function(req, res, next) {

  models.ElectoralList.findAll({

  })
  .then( lists => {

    if (lists) {

      let results = [];

      for (let list in lists) {

        results.push(list.responsify());
      }
      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'No Electoral List found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err  }); });

});

/*********************************** POST *************************************/

/* POST create candidate */
router.post('/candidate', function(req, res, next) {
  let send = req.body;

  models.Candidate.create({
    address     : send.address,
    name        : send.name,
    first       : send.first,
    age         : send.age,
    picture     : send.picture,
    job         : send.job,
    slogan      : send.slogan,
    program     : send.program,
    programfile : send.programfile,
    valid       : 1
  })
  .then( candidate => {

    if (candidate){

      if (send.political) {

        models.Political.find({
          where : {
            id : send.political
          }
        })
        .then( political => {

          if (political) {

            candidate.setPolitical(political)
            .then( political => {

              res.json({ result : 1, content : candidate.responsify() });
            });
          }
        })
        .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
      }
      res.json({ result : 1, content : candidate.responsify() });
    }
    else res.json({ result : -1, message : 'No Candidate found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/* POST create political */
router.post('/political', function(req, res, next) {

  models.Political.create({
    name     : send.name,
    position : send.position,
    color    : send.color,
    picture  : send.picture
  })
  .then( political => {

    if (political) {

      res.json({ result : 1, content : political.responsify() });
    }
    else res.json({ result : -1, message : 'No Political found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/* POST create list */
router.post('/list', function(req, res, next) {

  models.ElectoralList.create({
    name     : send.name
  })
  .then( list => {

    if (list) {

      models.Candidate.find({
        where : {
          id : send.candidate
        }
      })
      .then( candidate => {

        if (candidate) {
          list.setHead(candidate)
          .then( candidate => {

            res.json({ result : 1, content : list.responsify() });
          });
        }
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : -1, message : 'No List found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/* POST add candidate to list */
router.post('/tolist', function(req, res, next) {

});

/********************************* DELETE *************************************/

/* GET home page. */
router.delete('/:candidate', function(req, res, next) {

  models.Candidate.find({
    where : {
              id : req.params.candidate
            }
  })
  .then( candidate => {

    if (candidate) {

      candidate.destroy()
      .then( candidate => {

        res.json({ result : 1, content : candidate.responsify() });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Candidate found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/* GET home page. */
router.delete('/:political', function(req, res, next) {

  models.Political.find({
    where : {
              id : req.params.political
            }
  })
  .then( political => {

    if (political) {

      political.destroy()
      .then( political => {

        res.json({ result : 1, content : political.responsify() });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Political found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/* GET home page. */
router.delete('/:list', function(req, res, next) {

  models.ElectoralList.find({
    where : {
              id : req.params.list
            }
  })
  .then( list => {

    if (list) {

      list.destroy()
      .then( list => {

        res.json({ result : 1, content : list.responsify() });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Electoral List found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

module.exports = router;
