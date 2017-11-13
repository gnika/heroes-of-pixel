var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var pump       = require('pump');
let cleanCSS   = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');

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