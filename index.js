const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const DATA = 'mongodb://0.0.0.0/User?readPreference=secondaryPreferred'
const port = 5000
const routes = require('./Model/method')

app.use(cors())
app.use(express.json())

mongoose.connect(DATA)
const db = mongoose.connection
db.once('open',()=>{
    console.log('connect to mongoDB')
})
db.on('err',(err)=>{
     console.log(err)
})

app.use('/api',routes)

app.listen(port , ()=>{
    console.log(`server run on http://localhost:${port}`)
})

