var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var merge = require('merge-stream');


gulp.task('compress:app', function () {
    var app = gulp.src('public/js/app/**/*.js')
        .pipe(ngAnnotate())
        .pipe(concat("build.js"))
        .pipe(minify())
        .pipe(gulp.dest('./public/dist'))
});



gulp.task('compress:vendor',function(){

});


gulp.task('default', ['compress:app']);

