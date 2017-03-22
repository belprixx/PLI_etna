var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
    node_modules: './node_modules/',
    lib: './front/lib/js/modules/',
    jsFiles: './front/lib/js/*.js',
    controllers: './front/controller/*.js',
    jsDest: './front/lib/minify/'
};

gulp.task('clean:lib', function () {
    return del([paths.lib]);
});

gulp.task('copy', ['clean:lib'], function () {
    var modules = {
        "angular":                      "angular/*.{js,map,css,ttf,svg,woff,eot}",
        "angular-route":                "angular-route/*.{js,map}",
        "angular-local-storage":        "angular-local-storage/dist/*.{js,map}"
    };

    for (var destinationDir in modules) {
        gulp.src(paths.node_modules + modules[destinationDir])
            .pipe(gulp.dest(paths.lib + destinationDir));
    }
});

gulp.task('scripts', function() {
    return gulp.src(paths.jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task('controllers', function() {
    return gulp.src(paths.controllers)
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(rename('controllers.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task("default", ["scripts", "controllers"], function () {
    gulp.watch("./front/lib/js/*.js", ["scripts"]);
    gulp.watch("./front/controller/*.js", ["controllers"]);
});
