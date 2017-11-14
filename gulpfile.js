var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var pump       = require('pump');
let cleanCSS   = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
var watch      = require('gulp-watch');
var batch      = require('gulp-batch');

gulp.task('default', function () {

});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('assets/js/*.js'),
        uglify(),
        gulp.dest('assets/js/min')
    ],
        cb
    );
});

gulp.task('minify-css', () => {
    return gulp.src('assets/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css/min'));
});

gulp.task('watch', function() {
    watch('assets/js/*.js', batch(function (events, done) {
        gulp.start('compress', done);
    }));
    watch('assets/css/*.css', batch(function (events, done) {
        gulp.start('minify-css', done);
    }));
});