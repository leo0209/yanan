var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var reload      = browserSync.reload;
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
var fileinclude  = require('gulp-file-include');
// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less',"js-watch"], function() {

    browserSync.init({
        server: "./src/"
    });
    gulp.watch("src/js/index.js", ["js-watch"]);
    gulp.watch("src/css/*.less", ['less']);
    gulp.watch("src/*.html").on('change', reload);
});
//监听js，并压缩
gulp.task("js-watch", function() {
    gulp.src("src/js/index.js")
    .pipe(browserSync.stream())
    // .pipe(uglify())
    // .pipe(gulp.dest('js'))
})
// 资源嵌入
// gulp.task('fileinclude', function() {
//     gulp.src('src/dist/**.html')
//         .pipe(fileinclude({
//           prefix: '@@',
//           basepath: '@file'
//         }))
//     .pipe(gulp.dest('src'));
// });
// 监听less,并压缩css
gulp.task('less', function() {
    gulp.src("src/css/*.less")
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
});

//压缩图片
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('src/img'));
});
// 合成雪碧图?__sprite
gulp.task('sprite', function (done) {
    var timestamp = +new Date();
    gulp.src('src/css/index.css')
        .pipe(spriter({
            spriteSheet: 'src/img/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../img/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .on('end', done);
});
gulp.task('default', ['serve']);
