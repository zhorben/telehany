const gulp = require('gulp')

/*
  npm i -g gulp
  gulp db:load --from fixtures/users
*/

process.on('uncaughtException', function(err) {
  console.error(err.message, err.stack, err.errors)
  process.exit(255)
})

require = require('esm')(module)

// module.exports = require('./app.js')

gulp.task('db:load', require('./tasks/dbLoad'))
