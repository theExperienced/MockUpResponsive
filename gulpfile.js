// node.js Packages / Dependencies
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const cleanCSS      = require('gulp-clean-css');
const imageMin      = require('gulp-imagemin');
const pngQuint      = require('imagemin-pngquant'); 
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const jpgRecompress = require('imagemin-jpeg-recompress'); 
const clean         = require('gulp-clean');


// Paths
var paths = {
    root: { 
        www:        './'
    },
    src: {
        root:       '',
        html:       '*.html',
        css:        'css/*.css',
        js:         'js/*.js',
        vendors:    'vendors/**/*.*',
        imgs:       'img/**/*.+(png|jpg|gif|svg)',
        scss:       'scss/*.scss'
    },
    dist: {
        root:       'dist',
        css:        'dist/css',
        js:         'dist/js',
        imgs:       'dist/img',
        vendors:    'dist/vendors'
    }
}


// Compile SCSS
gulp.task('sass', function() {
    return gulp.src(paths.src.scss)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) 
    .pipe(autoprefixer({ 
        // browsers: ['last 2 versions'],
        // cascade: false
    })) 
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
});


// Minify + Combine CSS
gulp.task('css', function() {
    return gulp.src(paths.dist.css + '/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(concat('app.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.css))
});


// Minify + Combine JS
gulp.task('js', function() {
    return gulp.src(paths.src.js)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
});


// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', function(){
    return gulp.src(paths.src.imgs)
    .pipe(imageMin([
        imageMin.gifsicle(),
        imageMin.jpegtran(),
        imageMin.optipng(),
        imageMin.svgo(),
        pngQuint(),
        jpgRecompress()
    ]))
    .pipe(gulp.dest(paths.dist.imgs));
});


// copy vendors to dist
gulp.task('vendors', function() {
    return gulp.src(paths.src.vendors)
    .pipe(gulp.dest(paths.dist.vendors))
});


// clean dist
gulp.task('clean', function () {
    return gulp.src(paths.dist.root)
        .pipe(clean());
});


// Prepare all assets for production
gulp.task('build', gulp.series('sass', 'css', 'js', 'img'));

gulp.task('totalCSS', gulp.series('sass', 'css'));



// Watch (SASS, CSS, JS, and HTML) reload browser on change
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: paths.root.www
        } 
    })

    gulp.watch(paths.src.scss, gulp.task('totalCSS')).on('change', browserSync.reload);
    // gulp.watch(paths.src.css, ['css'])//.on('change', browserSync.reload);
    gulp.watch(paths.src.js);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
});