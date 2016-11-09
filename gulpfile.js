var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var reload      = browserSync.reload;
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less',"js-watch"], function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch("js/index.js", ["js-watch"]);
    gulp.watch("css/*.less", ['less']);
    gulp.watch("*.html").on('change', reload);
});
//监听js，并压缩
gulp.task("js-watch", function() {
    gulp.src("js/index.js")
    .pipe(browserSync.stream())
    // .pipe(uglify())
    // .pipe(gulp.dest('js'))
})

// 监听less,并压缩css
gulp.task('less', function() {
    return gulp.src("css/*.less")
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest("css"))
        .pipe(reload({stream: true}));
});


//压缩图片
gulp.task('testImagemin', function () {
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('img'));
});
gulp.task('default', ['serve']);