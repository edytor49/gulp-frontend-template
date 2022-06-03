// vars

const source = './_src'; // src folder
const dest = './app'; // dist folder

const config = {
  src: {
    data:       source + "/data/",
    twig:       source + "/template/pages/*.twig",
    scss:       source + "/stylesheet/*.scss",
    font:       source + "/font/**/*.{woff,woff2}",
    js:         source + "/javascript/**/*.js",
    libs:       source + "/libs/**/*",
    image:      source + "/image/content/**/*.{png,jpg,gif,ico,webp,svg}",
    css_image:  source + "/image/css/**/*.{png,jpg,gif,ico,webp,svg}",
    svgsprite:  source + "/image/svg/sprite/*.svg",
    svgfont:    source + "/image/svg/font/*.svg",
  },
  dest: {
    twig:       dest + "/",
    scss:       dest + "/stylesheet/",
    font:       dest + "/font/",
    js:         dest + "/javascript/",
    libs:       dest + "/libs/",
    image:      dest + "/image/",
    css_image:  dest + "/stylesheet/image/",
    svgsprite:  dest + "/stylesheet/svg/sprite/",
    svgfont:    source + "/font/svgfont/",
  },
  watch: {
    data:       source + "/data/**/*.twig.json",
    twig:       source + "/template/**/*.twig",
    scss:       source + "/stylesheet/**/*.scss",
    js:         source + "/javascript/**/*.js",
    image:      source + "/image/content/**/*.{png,jpg,gif,ico,webp,svg}",
    css_image:  dest   + "/image/css/**/*.{png,jpg,gif,ico,webp,svg}",
    svgsprite:  source + "/image/svg/sprite/**/*.svg",
    svgfont:    source + "/image/svg/font/**/*.svg",
    libs:       source + "/libs/"
  },
  svgfont: {
    name:      'svgfont',
    template:  source + '/stylesheet/utils/_svgfont_template.scss',
    format:    ['svg', 'woff', 'woff2'], // ['svg', 'ttf', 'eot', 'woff', 'woff2']
    font_dest: '../font/svgfont/',
    css_dest:  '../../stylesheet/base/_svgfont.scss',
  }
}

// packages

const del = require("del");
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const twig = require("gulp-twig");
const htmlmin = require("gulp-htmlmin");
const data = require('gulp-data');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fs = require('fs-extra');
const path = require('path');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const bourbon = require('bourbon');
const webpack = require('webpack-stream');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('gulp-webp');
const iconfont = require('gulp-iconfont');
const iconfontCSS = require('gulp-iconfont-css');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const critical = require('critical');
const merge =   require('merge-stream');

// functions

const server = () => {
  browserSync.init({
    server: { baseDir: dest },
    notify: false,
    // online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
  });
}

const compileTwig = () => {
  return gulp.src(config.src.twig)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(data(function( file ) {
      if (fs.pathExistsSync( config.src.data + path.basename(file.path) + '.json' )) {
        return fs.readJsonSync( config.src.data + path.basename(file.path) + '.json' );
      }
    }))
    .pipe(twig())
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.twig))
    .on('end', browserSync.reload);
}

exports.compileTwig = compileTwig;

const compileSCSS = () => {
  return gulp.src(config.src.scss)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    // .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      // sourcemaps: true,
      includePaths: bourbon.includePaths
    }))
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write())
    .pipe(cleancss({ level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.scss))
    .on('end', browserSync.reload);
}

exports.compileSCSS = compileSCSS;

const compileJS = () => {
  return gulp.src(config.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(webpack({
			mode: 'production',
			performance: { hints: false },
			module: {
				rules: [
					{
						test: /\.(js)$/,
						exclude: '/node_modules',
						loader: 'babel-loader',
						query: {
							presets: ['@babel/env'],
							plugins: ['babel-plugin-root-import']
						}
					}
				]
			}
		}))
    .pipe(rename('main.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.js))
    .on('end', browserSync.reload);
}

exports.compileJS = compileJS;

const optimizeImage = () => {
  return gulp.src(config.src.image)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest(config.dest.image))
    .pipe(gulp.src(config.src.image))
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 100, progressive: false}),
          imagemin.optipng({optimizationLevel: 0}), // max 7
          imagemin.svgo({
            plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
          }),
          imageminJpegRecompress(),
          imageminPngquant()
        ]), { verbose: true } // true -- log info on every image
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.image));
}

exports.optimizeImage = optimizeImage;

const optimizeCSSimage = () => {
  return gulp.src(config.src.css_image)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest(config.dest.css_image))
    .pipe(gulp.src(config.src.css_image))
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({interlaced: true}),
          // imagemin.mozjpeg({quality: 100, progressive: false}),
          // imagemin.optipng({optimizationLevel: 0}), // max 7
          imagemin.svgo({
            plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
          }),
          imageminJpegRecompress(),
          imageminPngquant()
        ]), { verbose: true } // true -- log info on every image
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.css_image));
}

exports.optimizeCSSimage = optimizeCSSimage;

const compileSVGsprite = () => {
  return gulp.src(config.src.svgsprite)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
          example: true,
          render: {
            scss: {
              dest: "../../../../../" + source + "/stylesheet/base/_svgsprite.scss",
              template: source + "/stylesheet/utils/_svgsprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest.svgsprite));
}

exports.compileSVGsprite = compileSVGsprite;

const compileSVGfont = () => {
  return gulp.src(config.src.svgfont)
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[clip-path]').removeAttr('clip-path');
        // $('[width]').removeAttr('width');
        // $('[height]').removeAttr('height');
        // $('[viewBox]').removeAttr('viewBox');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(iconfontCSS({
      fontName: config.svgfont.name,
      path: config.svgfont.template,
      targetPath: config.svgfont.css_dest,
      fontPath: config.svgfont.font_dest,
      cssClass: 'icon'
    }))
    .pipe(iconfont({
      fontName: config.svgfont.name,
      formats: config.svgfont.format,
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest(config.dest.svgfont))
}

exports.compileSVGfont = compileSVGfont;

const compileCriticalCSS = () => {
  critical.generate({
    base: config.dest.twig,
    src: 'index.html',
    css: ['stylesheet/stylesheet.min.css'],
    target: {
      html: 'index-critical.html'
    },
    inline: true,
    extract: true,
    minify: true,
    width: 1920,
    height: 1080
  });
}

exports.compileCriticalCSS = compileCriticalCSS;

const copy = () => {
  return merge([
    gulp.src(config.src.font).pipe(gulp.dest(config.dest.font)),
    gulp.src(config.src.libs).pipe(gulp.dest(config.dest.libs))
  ]);
}

exports.copy = copy;

const clean = () => {
  return del(dest);
}

exports.clean = clean;

const watch = () => {
  gulp.watch([config.watch.data, config.watch.twig], compileTwig);
  gulp.watch(config.watch.scss, compileSCSS);
  gulp.watch(config.watch.js, compileJS);
  gulp.watch(config.watch.image, optimizeImage);
  gulp.watch(config.watch.css_image, optimizeCSSimage);
  gulp.watch(config.watch.svgsprite, compileSVGsprite);
  gulp.watch(config.watch.svgfont, compileSVGfont);
}

exports.watch = watch;

const build = gulp.series(clean, gulp.parallel(compileSVGfont, compileSVGsprite), gulp.parallel(compileTwig, compileSCSS, compileJS, optimizeImage, optimizeCSSimage, copy));

exports.build = build;

exports.default = gulp.series(build, gulp.parallel(server, watch));
