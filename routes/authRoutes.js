const express = require('express')
const router = express.Router() 
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils');


router.post('/register', async (req, res) => {
   const user = req.body
    try {

    
     const emailAlreadyExists = await User.find({email})
     if(emailAlreadyExists) {
         throw new CustomError.BadRequestError('Email AlreadyExists')
     }
     const isFirstAccount = (await User.countDocuments({})) ===0
     const role = isFirstAccount ? 'admin' : 'user';

     const user = await User.create({ user })
     const tokenUser = createTokenUser(user);
     attachCookiesToResponse({res, user: tokenUser })
     res.status(StatusCodes.CREATED).json({
         user: tokenUser
     })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong'
        })
    }

}) 

router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   try {
       
      if(!username || !password) {
       throw new CustomError.BadRequestError('Please provide username and password')
   }
   const user = await User.findOne({ username });

   if(!user) {
       throw new CustomError.UnauthenticatedError('Invalid Credentials')
   }
   const ispassCorrect = await user.comparePassword(password)

   if(!ispassCorrect) {
     throw new CustomError.UnauthenticatedError('Invalid Credentials') 
   }

   const tokenUser = createTokenUser(user);
   attachCookiesToResponse({ res, user: tokenUser});

   res.status(StatusCodes.OK).json({ user: tokenUser });

} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong'
    })    
}
});

router.get('/logout',async (req, res) => {
    try {
       
    res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
});
  res.status(StatusCodes.OK).json({ msg:'user logged out!'})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong'
    })      
}

})




module.exports = router