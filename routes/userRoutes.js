const express = require('express')
const router = express.Router()
const User = require('../models/User')



const {StatusCodes} = require('http-status-codes')
const {CustomError} = require('../errors/index')



router.post('/', async (req, res) => {
    
    try{
        
      const user = await User.create(req.body);
      res.status(StatusCodes.CREATED).json({user})  

    } catch (error) {
        console.log(error)
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
           error:'Something went wrong'
           
       })
    }
})


router.get('/', async (req, res) => {
   try {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users, count: users.length});
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
       error:'Something went wrong'
      
    }) 
   }
})


router.get('/:id', async (req, res) => {
    const {id: userId } = req.params;
    try {
     const user = await User.findOne({_id: userId})

     if(!user) {
         throw new CustomError.NotFoundError(`No user with id: ${userId} `)
     }
     res.status(StatusCodes.OK).json({user})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'Something went wrong'
           
         })
    }
})

router.patch('/:id', async (req, res) => {
    const {id: userId } = req.params;
     try {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
        runValidators: true,
      });
    
      if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${userId}`);
      }
    
      res.status(StatusCodes.OK).json({ product });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'Something went wrong'
           
         })
    }
})


router.delete('/:id', async (req, res) => {
    const { id: userId } = req.params;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
          throw new CustomError.NotFoundError(`No user with id : ${userId}`);
        }
      
        await user.remove();
        res.status(StatusCodes.OK).json({ msg: 'Success! user removed.' });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'Something went wrong'
           
         })
    }
    
})





module.exports = router