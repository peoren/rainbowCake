// 引入
const gulp = require('gulp');
// const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const cleanCss =  require('gulp-clean-css');
const rename = require('gulp-rename');


//压缩css
gulp.task('cleanCss',function() {
    return gulp.src('./public/css/**/*.css')
        .pipe(cleanCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./public/css'))
})

// 压缩js
gulp.task('uglifyJs',function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./public/js'))
})

// 实时预览
// gulp.task('server',function() {
//     browserSync.init({
//         server: {
//             baseDir:'./public'
//         },
//         port:8888
//     })
//     gulp.watch('./public/**/*.js',gulp.series('uglifyJs'));
//     gulp.watch('./public/**/*.css',gulp.series('cleanCss'));
//     gulp.watch('./public/**/*').on('change',browserSync.reload);
// });

// 默认任务
gulp.task('default',gulp.series('cleanCss','uglifyJs'));