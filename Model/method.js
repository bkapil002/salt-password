const express = require('express')
const routes = express.Router()
const sigincontroller = require('./Sigin')

routes.post('/user',sigincontroller)
module.exports=routes