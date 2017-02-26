var gulp = require('gulp');
var plus = require('gulp-load-plugins')();
var open = require('open');


var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: 'dist/'
};

gulp.task('lib', function() {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vender'))
        .pipe(gulp.dest(app.prdPath + 'vender'))
        .pipe(plus.connect.reload())
});


gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe(plus.connect.reload())

});
gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe(plus.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe(plus.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe(plus.connect.reload())
});


gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe(plus.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe(plus.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe(plus.connect.reload());
});

gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe(plus.clean())
});

gulp.task('build', ['js', 'less', 'lib', 'html']);

gulp.task('server', ['build'], function() {
    plus.connect.server({
        root: [app.devPath],
        liveload: true,
        port: 9000
    })
    open('http://localhost:9000')

    gulp.watch(app.srcPath + 'script/**/*.js', ['js'])
    gulp.watch('bower_components/**/*', ['lib'])
    gulp.watch(app.srcPath + '/**/*.html', ['html'])
    gulp.watch(app.srcPath + 'style/**/*.less', ['less'])
});

gulp.task('default', ['server']);
