const Routers = (app) => {
    var blogsRouter = require('./blogs');
    var usersRouter = require('./users');

    app.use('/api/blog', blogsRouter);
    app.use('/api/user', usersRouter);
}
module.exports = Routers