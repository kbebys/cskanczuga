'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const kit = require('gulp-kit');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	sassDest: './dist/css',
	js: './src/js/**/*.js',
	jsDest: './dist/js',
	img: ['./src/img/**/*'],
	imgDest: './dist/img',
	dist: './dist',
	filesToMove: ['./src/fonts/**/*.*', './src/glide/**/*.*', './src/img/**/*.*'],
};

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cssnano({ zindex: false }))
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function javaScript(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

function convertImages(done) {
	src(paths.img).pipe(webp()).pipe(dest(paths.imgDest));
	done();
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'));
	done();
}

function moveFiles(done) {
	src(paths.filesToMove, { base: './src/' }).pipe(dest('./dist'));
	done();
}

function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean());
	done();
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	done();
}

function watchForChanges(done) {
	//When you work with .html files
	// watch('./*.html').on('change', reload);
	//paths.html and handleKits when you work with .kit files
	watch(['./*.html', paths.sass, paths.js], parallel(handleKits, sassCompiler, javaScript)).on('change', reload);
	// watch(paths.img, convertImages).on('change', reload);
	done();
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScript);
exports.cleanStuff = cleanStuff;
exports.convertImages = convertImages;
exports.moveFiles = moveFiles;
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
