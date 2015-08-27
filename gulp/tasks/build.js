'use strict';

const gulp = require('gulp'),
  typescript = require('gulp-typescript'),
  webpack = require('gulp-webpack'),
  merge = require('merge2'),
  uglify = require('gulp-uglify'), 
  ignore = require('gulp-ignore'),
  rename = require('gulp-rename');
  
const config = require('../config'); 
  
const project = typescript.createProject('./tsconfig.json', {
  target: 'es5',
  declarationFiles: true
});

gulp.task('build:typescript', function () {

  let result = project.src('./src/**/*.ts')
  .pipe(typescript(project));

  let js = result.js
  .pipe(gulp.dest(config.libPath));

  let dts = result.dts.pipe(gulp.dest(config.libPath));

  return merge([js,dts]);

});

gulp.task('build:bundle', ['build:typescript'], function () {
  return gulp.src('./lib/index.js')
  .pipe(webpack({
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    output: {
      library: config.libName,
      libraryTarget: "umd",
      filename: config.libName + '.bundle.js'
    }
  }))
  .pipe(gulp.dest(config.distPath));
});

gulp.task('build:unbundle', ['build:typescript'], function () {
  return gulp.src('./lib/index.js')
  .pipe(webpack({
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    output: {
      library: config.libName,
      libraryTarget: "umd",
      filename: config.libName + '.js'
    },
    externals: {
      "views": 'views'
    }
  }))
  .pipe(gulp.dest(config.distPath));
});


gulp.task('build', ['build:bundle','build:unbundle'])

gulp.task('definition', ['build',], function () {
  return gulp.src('./templates/jform.d.ts')
  .pipe(gulp.dest('./'));
});


gulp.task('uglify', ['build'], function () {
   return gulp.src('./dist/*.js')
   .pipe(ignore.exclude('./dist/*.min.js'))
   .pipe(uglify())
   .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest(config.distPath));
});