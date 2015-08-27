

const gulp = require('gulp'),
	inject = require('gulp-inject'),
	mocha = require('gulp-mocha-phantomjs'),
	rename = require('gulp-rename');
	
	
gulp.task('test', function () {
	return gulp.src('./test-runner.html')
	.pipe(inject(gulp.src('./test/**/*.js', { read: false}), {relative:true}))
	.pipe(mocha({
		reporter: 'landing'
	}));
});

gulp.task('test:runner', function () {
	return gulp.src('./test-runner.html')
	.pipe(inject(gulp.src('./test/**/*.js', { read: false}), {relative:true}))
	.pipe(rename('test-runner.injected.html'))
	.pipe(gulp.dest('./'));
})
	
