const gulp = require('gulp')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const del = require('del')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')

gulp.task('stylus', function() {

    const browsersSupport = [
      'last 2 versions',
      '> 5%',
      'ie >= 10'
    ]

    return gulp
        .src('src/styles/main.styl')
        .pipe(stylus({ compress : true }))
        .pipe(autoprefixer({ browsers: browsersSupport }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream())
})

gulp.task('scripts', function() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream())
})

gulp.task('copy:index', function() {
    return gulp
        .src('src/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
})

gulp.task('copy:images', function () {
    return gulp
        .src('src/images/**/*')
        .pipe(gulp.dest('dist/assets/images'))
})

gulp.task('clean-dist', function() {
    return del('dist/')
})

gulp.task('build', function() {
    runSequence('clean-dist', ['copy:index', 'copy:images', 'stylus', 'scripts'])
})

gulp.task('dev', ['build'], function() {

    browserSync.init({ server: "./dist" })

    gulp.watch('src/styles/**/*.styl', ['stylus'])
    gulp.watch('src/js/**/*.js', ['scripts'])
    gulp.watch('src/index.html', ['copy:index'])
})
