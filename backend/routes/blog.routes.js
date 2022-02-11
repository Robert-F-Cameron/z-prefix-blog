module.exports = app => {
    const blogPosts = require('../controller/blog.controller.js');
    var router = require('express').Router();

    router.post('/', blogPosts.create);
    router.get('/', blogPosts.findAll);
    router.get('/', blogPosts.findAllPublished);
    router.get('/:id', blogPosts.findOne);
    router.put('/:id', blogPosts.update);
    router.delete('/:id', blogPosts.delete);
    router.delete('/', blogPosts.deleteAll);

    app.use('/api/blogPosts', router);
};