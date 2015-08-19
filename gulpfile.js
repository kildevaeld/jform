/* jshint esnext:true, node:true */
'use strict';

const gulp = require('gulp'),
      tsc = require('gulp-typescript'),

      merge = require('merge2'),
      del = require('del'),
      webpack = require('gulp-webpack');


gulp.task('build:typescript', function () {

  let result = gulp.src('./src/**/*.ts')
  .pipe(tsc({
    "target": "ES5",
    "module": "commonjs",
    "isolatedModules": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": false,
    "noLib": false,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true,
    declarationFiles: true
  }));

  let js = result.js
  .pipe(gulp.dest('./lib'));

  let dts = result.dts.pipe(gulp.dest('./lib'));

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
      library: "JForm",
      libraryTarget: "umd",
      filename: 'jform.bundle.js'
    }
  }))
  .pipe(gulp.dest('./dist'));
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
      library: "JForm",
      libraryTarget: "umd",
      filename: 'jform.js'
    },
    externals: {
      "views": 'views'
    }
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build:bundle','build:unbundle'])

gulp.task('definition', ['build',], function () {
  return gulp.src('./templates/jform.d.ts')
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'definition']);

gulp.task('watch', function () {
  gulp.watch('./src/**/*.ts', ['build']);
});

gulp.task('clean', function (done) {
  del(['./lib','./dist'], done);
});
