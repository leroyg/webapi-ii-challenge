const express = require("express");
const dataBase = require("../data/db.js");
const router = express.Router();

//Get all
router.get("/", (req, res) => {
  dataBase.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "No information retrieved." });
    });
});

//Get by an ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    dataBase.findById(id)
      .then(userId => res.status(200).json(userId))
      .catch(error => {
        error
          .status(500)
          .json({ error: "No information retrieved." });
      });
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

//Post
router.post("/", (req, res) => {
  const blogBody = req.body;
  const { title, contents } = req.body;
  if (title && contents) {
    dataBase.insert(blogBody)
      .then(blogs => {
        res.status(201).json(blogs);
      })
      .catch(error => {
        res.status(500).json({
          error: "Error saving post"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Post requires a title and contents for the post."
    });
  }
});

//Delete 
router.delete("/", (req, res) => {
  const { id } = req.params;
  if (id) {
    dataBase.remove(id)
      .then(user => res.status(200).json(user))
      .catch(error =>
        res.status(500).json({ error: "The post cannot be removed" })
      );
  } else
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
});
router.put("/:id", (req, res) => {
  //get ID
  const { id } = req.params;
  //get Body
  const blogInfo = req.body;
  //get Title and Posts
  const { title, contents } = req.body;

  // Missing ID 
  if (!id) {
    dataBase.update(id, blogInfo).then(user =>
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    );
  }

  //Missing title or body
  else if (!title) {
    dataBase.update(id, blogInfo).then(user =>
      res.status(400).json({
        errorMessage: "Please provide title for the post."
      })
    );
  }

  //Missing body
  else if (!contents) {
    dataBase.update(id, blogInfo).then(user =>
      res.status(400).json({
        errorMessage: "Please provide contents for the post."
      })
    );
  }

  //If all works - server error
  else
  {  dataBase.update(id, blogInfo)
      .then(user => res.status(200).json(user))
      .catch(error =>
        res
          .status(500)
          .json({ message: "Server is broken." })
      );}
});

module.exports = router;