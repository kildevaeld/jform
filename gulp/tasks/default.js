
const gulp = require('gulp');

gulp.task('default', ['build', 'definition', 'uglify', 'test']);

gulp.task('watch', ['build'], function () {
  gulp.watch('./src/**/*.ts', ['build']);
});