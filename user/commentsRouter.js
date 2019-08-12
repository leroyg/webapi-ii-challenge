const express = require("express");
const dataBase = require("../data/db.js");
const router = express.Router();

// getting id/comments

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    console.log(id);
        if (!id) {
            dataBase.findCommentById(id).then(userId => 
                res
                    .status(404)
                    .json({ message: "This post could not be found, it may not exist" })
                );
        } else {
            dataBase.findCommentById(id)
            .then(userId => res.status(200).json(userId))
            .catch(err => 
                res
                .status(500)
                .json({ error: "This comment could not be found." })
                );
        }
});

router.post("/:id/comments", (req, res) => {
    const blogPostBody = req.body;
    const { text } = req.body;
    if (text) {
        dataBase.insertComment(blogPostBody)
        .then(blog => {
            res.status(201).json(blogs);
        })
        .catch(error => {
            res.status(500).json({
                error: "Error post not saved"
            });
        });
    } else {
        res.status(400).json({
            errorMessage: "Comments require text"
        });
    }
});

module.exports = router;

