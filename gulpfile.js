var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	del = require('del');
	
//converting sass into css
gulp.task('sass', function(){ 
	return gulp.src('src/style/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(sourcemaps.write()) 
		.pipe(gulp.dest('src/style'))
		.pipe(browserSync.reload({stream: true}));
});

//minifying js
gulp.task('minifyScripts', function() {
	return gulp.src('src/js/main.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.reload({stream: true}));
});

//image optimization
gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
	}))
});

//browser sync
gulp.task('browser-sync', function () {
  var files = [
	'src/**/*.html',
	'src/style/**/*.scss',
	'src/js/main.js'
  ];
  
  browserSync.init(files, {
	server: {
	  baseDir: 'src'
	}
  });
});

//file changes monitor
gulp.task('watch', ['browser-sync', 'sass', 'minifyScripts'], function() {
	gulp.watch('src/style/**/*.scss', ['sass']);
	gulp.watch('src/js/main.js', ['minifyScripts']);
});

//cleaning build folder
gulp.task('clean', function() {
	del('build', 'src/style/main.css', 'src/js/main.min.js');
});

//build task
gulp.task('build', ['sass', 'minifyScripts', 'img'], function() {
	gulp.src(['src/style/*.css', 'src/js/main.min.js',
			'src/*.html', 'src/img/**', 'src/fonts/**', 'src/data/**'], { base: './src'})
			.pipe(gulp.dest('docs'));
});

//setting default task
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});