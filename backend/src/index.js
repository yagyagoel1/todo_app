import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/index.js'

dotenv.config({path: '../.env'})
connectDB().then(()=>{
try{
    app.on('error', (error) => {
        console.log(`Error occured while connecting express: ${error.message}`)

    })
    app.listen(process.env.PORT||3000, () => {
        console.log(`Server is running on port: ${process.env.PORT||3000}`)
    })
}
catch(error){
    console.log(`Something went wrong while connecting express: ${error.message}`)
}})
