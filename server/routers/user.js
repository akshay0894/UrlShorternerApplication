const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/login', (req, res, next) =>{
  User.findOne({email: req.body.email}).then(loginUser => {
    if(!loginUser) {
      return res.status(401).json({message: 'invalid username or password'});
    } else if(!loginUser.validatePassword(req.body.password)){
         return res.status(401).json({message: 'invalid username or password'});
    }
    const withToken = { email: loginUser.email, _id: loginUser._id};
    withToken.token = loginUser.generateJWT();
    res.status(200).json(withToken);
  });

});

router.post('/register', (req, res, next)=>{
  const newUser= new User ({
    fullName: req.body.fullName,
    email: req.body.email,
  });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save().then(rec =>{
    res.status(201).json(rec);
  }).catch(error => {
     res.status(404).json({error: error});
  })
})



module.exports = router;
