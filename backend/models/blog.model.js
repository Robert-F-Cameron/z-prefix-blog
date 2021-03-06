module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: Sequelize.STRING
        },
        contents: {
            type: Sequelize.TEXT
        },
        published: {
            type: Sequelize.BOOLEAN
        },
    });

    return Blog;
}