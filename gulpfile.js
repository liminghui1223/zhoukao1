var gulp = require('gulp');
var minCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var dataJson = require('./data/data.json');

//压缩scss
gulp.task('minCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series(minCss))
})

//压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('bull'))
})

//起服务
gulp.task('devserver', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/api/getData') {
                    res.end(JSON.stringify({ code: 0, data: dataJson }));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('dev', gulp.series('minCss', 'devserver', 'uglify', 'watch'));