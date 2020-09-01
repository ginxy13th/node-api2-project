const express = require('express');
const server = express();
const postRouter = require('./express-router.js');

server.use(express.json());
server.use('/api/posts', postRouter);

server.listen(5679, () => {
    console.log('\n*** Server Running on htto://localhost:5679 ***\n');
})
