var gulp = require('gulp');
var del = require('del');

var paths = {
    node_modules: './node_modules/',
    lib: './front/lib/js/modules/'
};

gulp.task('clean:lib', function () {
    return del([paths.lib]);
});

gulp.task('copy', ['clean:lib'], function () {
    var modules = {
        "angular":                      "angular/*.{js,map,css,ttf,svg,woff,eot}",
        "angular-route":                "angular-route/*.{js,map}"
    };

    for (var destinationDir in modules) {
        gulp.src(paths.node_modules + modules[destinationDir])
            .pipe(gulp.dest(paths.lib + destinationDir));
    }
});
