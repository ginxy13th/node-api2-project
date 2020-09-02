const express = require('express');
const server = express();
const postRouter = require('./express-router.js');
const port = 5679;

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Welcome to our API'})
})
server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})
