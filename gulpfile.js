/* jshint esnext:true, node:true */
'use strict';

const gulp = require('gulp'),
      tsc = require('gulp-typescript'),

      merge = require('merge2'),
      del = require('del'),
      webpack = require('gulp-webpack');



require('requiredir')('./gulp/tasks');

gulp.task('clean', function (done) {
  del(['./lib','./dist'], done);
});
