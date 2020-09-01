const express = require('express');
const Posts = require('./data/db.js');
const router = express.Router();

router.post("/", (req, res) => {
    const something = req.body
    Posts.add(something)
    .then(post => {
        if (!something.title || something.contents) {
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
        } else {
            res.status(201).json(post)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: 'There was an error while saving the post to the database.'})
    })
});
router.post("/:id/comments", (req, res) => {
    const something = req.body
    const id = req.params.id
    Posts.add(something)
    .then(post => {
        if (something.id !== id) {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        } else {
            res.status(201).json(post)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'There was an error while saving the comment to the database.'})
    })
});
router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'there was an error'})
    })
});
router.get("/:id/comments", (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'there was an error'})
    })
});
router.delete("/:id/", (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'there was an error'})
    })
});
router.put("/:id/", (req, res) => {
    const changes = req.body
    Posts.add(req.body)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'cannot find'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'there was an error'})
    })
});

module.exports = router;