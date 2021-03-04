const express = require('express');
const Posts = require('./data/db.js');
// const shortid = require('shortid');
const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } = require("./data/db.js");
const router = express.Router();

router.post("/", (req, res) => {    
    Posts.insert({
        title: req.body.title,
        contents: req.body.contents,
    })
    .then(post => {
        if (!req.body.title || !req.body.contents) {
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
    Posts.insertComment({
        text: req.body.text,
        post_id: req.params.id,
    })
    .then(comment => {
        if (!req.body.text) {
            res.status(400).json({message: 'Please provide text for the comment.'})
        } else if (comment) {
            res.status(201).json(comment)
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'There was an error while saving the comment to the database.'})
    })
});
router.get("/", (req, res) => {
    Posts.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: 'The posts information could not be retrieved.'})
    })
});
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'The post information could not be retrieved.'})
    })
});
router.get("/:id/comments", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'The post information could not be retrieved.'})
    })
});
router.delete("/:id/", (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: 'The post has been deleted.'})
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'The post could not be removed.'})
    })
});
router.put("/:id/", (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else if (!req.body.title || !req.body.contents) {
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'The post information could not be motified.'})
    })
});

module.exports = router;