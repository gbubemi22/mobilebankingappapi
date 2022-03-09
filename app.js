const express = require('express')
const app = express()
const bodyParser = require("body-parser")



require('dotenv').config()
const morgan = require('morgan');

const cookieParser = require('cookie-parser');





const AdminRoutes = require('./routes/userRoutes')
const AuthRoutes = require('./routes/authRoutes')


//connect DB
const connectDB = require('./db/dbConfig');
//middleware errors
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')








app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECT))

//routes
app.use('/api/v1/admin/users',AdminRoutes)
app.use('/api/v1/auth/',AuthRoutes)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        
app.listen(PORT, ()=>{
    console.log(`port is listing on ${PORT}`)
})
    } catch (error) {
       console.log(error) 
    }
};
start();



 


