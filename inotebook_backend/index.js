// server generated using express

const express = require('express')
const connectTomongoos = require('./db')
var cors = require('cors')
require('dotenv').config();



//call a connect mongo function which one exported from db.js
connectTomongoos();

const app = express()

const port = process.env.PORT;


app.use(cors())



//get a json body data
app.use(express.json())


//Available Routes

app.use('/api/auth/', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})