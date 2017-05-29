const
    gulp        = require('gulp'),
    del         = require('del'),
    usemin      = require('gulp-usemin'),
    rev         = require('gulp-rev'),
    cssNano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify');

gulp.task('build', [
    'cleanDist',
    'useminTrigger',
]);

gulp.task('cleanDist', ['icons'], function () {
    return del(['./docs']);
})

gulp.task('useminTrigger', ['cleanDist'], function () {
    gulp.start('optimizeStaticFiles');
})

gulp.task('optimizeStaticFiles', ['css', 'scripts'], function () {
    return gulp.src(['./app/index.html'])
        .pipe(usemin({
            css: [
                function () {
                    return rev();
                },
                 function () {
                    return cssNano();
                }
             ],
            js: [
                function () {
                    return rev()
                },
                function () {
                    return uglify();
                }
            ]
        }))
        .pipe(gulp.dest('./docs'))
})
