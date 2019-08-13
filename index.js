const express = require('express')
const Router = require('./user/router')

const Comments = require('./user/commentsRouter')
const port = 4000
const server = express();

server.use(express.json());
server.use('/api/posts', Router);
server.use('/api/posts', Comments);

server.listen(port, ()=>console.log('Server is connected!'))