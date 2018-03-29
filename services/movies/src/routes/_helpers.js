const request = require('request-promise');

let ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
     // return res.status(400).json({ status: 'Please log in movie-service' });
    // return res.status(400).json({ status: req.headers.authorization });
    //  return res.status(400).json({ status: req.headers });
    //  return res.status(400).json({ status: Bearer ${req.headers.authorization.split(' ')[1]} });
    //  return res.json({ status: 'hi'});
  }
// res.json({ status: 'hi'});
  const options = {
    method: 'GET',
    uri: 'http://users-service:3000/users/user',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
    },
  // res.json({ status: 'hi'});
  };
//return res.json({ status: 'hi'});
//res.json({ status: 'hi'});
  return request(options)
  .then((response) => {
    req.user = response.user;
    //res.json({ status: 'hi'});
    return next();
    
  })
  //.catch((err) => { return next(err); });
};

 if (process.env.NODE_ENV === 'test') {
  ensureAuthenticated = (req, res, next) => {
    req.user = 1;
    return next();
  };

}

module.exports = {
  ensureAuthenticated,
};

