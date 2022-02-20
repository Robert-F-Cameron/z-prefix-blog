const db = require('../models');
const Blog = db.blog;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Blog Post
  const blog = {
    title: req.body.title,
    contents: req.body.contents,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };
  // Save Blog Post in the database
  Blog.create(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog Post.",
      });
    });
};
//Finds all blog posts
exports.findAll = (req, res) => {
const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Blog.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while retrieving blog posts.",
        });
    });
};

//Finds all users blog posts
exports.findUserPosts = (req, res) => {
const userId = req.params.userId;
    var condition = userId ? { userId: `${userId}` } : null;
    Blog.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while retrieving your blog posts.",
        });
    });
};
//finds one blog post by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
  Blog.findByPk(id, { include: ["user"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Blog Post with id=${id}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Blog Post with id=" + id,
      });
    });
};
//Updates blog post using the blog ID
exports.update = (req, res) => {
    const id = req.params.id;
    Blog.update(req.body, {
      where: { id: id },
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Blog Post was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Blog Post with id=${id}. Maybe the Post was not found or req.body is empty!`,
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Blog Post with id=" + id,
        });
      });
};
//Deletes blog post by ID
exports.delete = (req, res) => {
const id = req.params.id;
  Blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blog post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Blog post with id=${id}. Maybe the post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blog Post with id=" + id
      });
    });
};
//NUKES ALL BLOG POSTS
exports.deleteAll = (req, res) => {
    exports.deleteAll = (req, res) => {
      Blog.destroy({
        where: {},
        truncate: false,
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while removing all tutorials.",
          });
        });
    };
};
//Finds all blog posts looking for the published to === true
exports.findAllPublished = (req, res) => {
    Blog.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving blog posts.",
        });
      });
};