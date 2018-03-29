const bcrypt = require('bcryptjs');
const knex = require('../db/connection');
const localAuth = require('./local');

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash,
  //  email: req.body.email,
  })
  .returning('*');
}

function getUser(username) {
  return knex('users').where({ username }).first();
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

/* eslint-disable consistent-return */
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    //return res.status(400).json({
      //status: 'Please log in users-service',
      //  status: req.headers.authorization,
   // });
  }

  // decode the token
  //res.json({ status: 'hi'}); 
  const header = req.headers.authorization.split(' ');
  const token = header[1];
 // res.json({ status: header}); 
  localAuth.decodeToken(token, (err, payload) => {
    //res.json({ status: 'hi'});
    if (err) {
      return res.status(401).json({
        status: 'Token has expired',
      });
    }
    
    return knex('users').where({ id: parseInt(payload.sub, 10) }).first()
    .then((user) => {
      req.user = user.id;
     // return res.json({ status: 'hi'});
      return next();
    })
   .catch(() => {
      return res.status(500).json({
        status: 'error in user-service',
      });
    });
  });
}
/* eslint-enable consistent-return */

module.exports = {
  createUser,
  getUser,
  comparePass,
  ensureAuthenticated,
};
