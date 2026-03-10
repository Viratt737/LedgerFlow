require('dotenv').config()
const connectToDB = require('./src/config/db');
connectToDB();
const app = require('./src/app');
app.listen(7000, ()=>{
    console.log('server is running at port 7000');
})