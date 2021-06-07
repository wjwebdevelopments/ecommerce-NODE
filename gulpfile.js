const { src, dest, parallel, watch  } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
	scss: './src/dist/scss/**/*.scss',
	javascript: './src/dist/js/**/*.js',
	imagenes: './src/dist/img/**/*'
}

function css() {
	return src(paths.scss)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./src/public/css'));
}

function javascript() {
    return src(paths.javascript)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js')) // final output file name
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./src/public/js'));
}

function imagenes() {
	return src(paths.imagenes)
		.pipe(cache(imagemin({ optimizationLevel: 3 })))
		.pipe(dest('./src/public/img'))
		.pipe(notify({ message: 'Imagen completada' }));
}

function versionWebp() {
	return src(paths.imagenes)
		.pipe(webp())
		.pipe(dest('./src/public/img'))
		.pipe(notify({ message: 'Imagen completada' }));
}

function watchFiles() {
	watch(paths.scss, css);
}

exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = parallel(javascript, css, imagenes, versionWebp, watchFiles);







