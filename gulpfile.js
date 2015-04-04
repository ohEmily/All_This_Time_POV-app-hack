var gulp = require('gulp');
var gutil = require('gutil');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var cssBase64 = require('gulp-css-base64');
var watch = require('gulp-watch');
var hologram = require('gulp-hologram');
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

var env = "development";
var minify = false;

var bases = {
 src: __dirname+'/src/',
 dist: __dirname+'/www-dev/',
 distDevelopment: __dirname+'/www-dev/',
 distProduction: __dirname+'/www/'
};

var paths = {
 scripts: ['scripts/js/'],
 styles: ['styles/**/*.css'],
 html: ['index.html'],
 assets: ['assets/']
};


// ------------------------------------------------
// CLEAN DIST FOLDERS
// ------------------------------------------------

// Delete the dist directory
gulp.task('clean', function(cb) {
  if(env==="production") {
    return del([bases.dist+"**"], {force: true}, cb);
  }else{
     return gulp.src([
        bases.dist+paths.assets,
        bases.dist+paths.scripts,
        bases.dist+paths.html])
        .pipe(clean({force: true}, cb));
  }
});


// ------------------------------------------------
// MOVE FILES
// ------------------------------------------------

gulp.task('move', ['hologram', 'webpack:build', 'clean'], function(cb){

  // PRODUCTION
  if(env==="production") {
    return gulp.src([
            'assets/audio/**/*.*',
            'assets/fonts/**/*.*',
            'assets/images/**/*.*',
            'assets/videos/**/*.*',
            'downloads/**/*.*',
            '.htaccess',
            'robots.txt',
            'git_deploy.php',
            'google844096eb68b48ec7.html'
            ], {base: bases.src, cwd: bases.src})
            .pipe(gulp.dest(bases.dist))
  }else{

    // DEVELOPMENT
    return gulp.src([
        'index.html',
        'styles/css/**/*',
        'scripts/js/vendor/**/*',
        'assets/images/**/*',
        'assets/fonts/**/*',
        'assets/video/**/*',
        'downloads/**/*.*'
      ], {base: bases.src, cwd: bases.src})
      .pipe(gulp.dest(bases.dist, cb));
  }
});


// ------------------------------------------------
// BUILD JAVASCRIPT - WEBPACK
// ------------------------------------------------

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var that = this;
  var myConfig = new webpackConfig();
  myConfig.cache = false;

  // minify = true;

  if(minify===true) {
    myConfig.plugins = myConfig.plugins || [];
    myConfig.plugins = myConfig.plugins.concat(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
    );
    myConfig.plugins = myConfig.plugins.concat(
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production")
        }
      })
    );
  }

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));

    callback();
  });
});


// ------------------------------------------------
// BUILD CSS - WITH SASS
// ------------------------------------------------

gulp.task('sass', function () {
  return gulp.src([
            bases.src+'/styles/scss/base.scss',
            bases.src+'/styles/scss/main.scss'
          ])
          .pipe(sass({errLogToConsole: true}))
          .pipe(cssBase64({
              extensionsAllowed: ['.woff']
          }))
          .pipe(gulp.dest(bases.src+'/styles/css'));
});


// ------------------------------------------------
// BUILD HOLOGRAM STYLEGUIDE
// ------------------------------------------------
gulp.task('hologram', ['sass'], function(callback) {
  if(!minify) {
      return gulp.src('hologram_config.yml')
                .pipe(hologram({logging:true}));
  }
  callback();
});



// ------------------------------------------------
// DEVELOPMENT BUILD
// ------------------------------------------------

gulp.task('build:dev:watch', ['build:dev'], function(callback) {
  gulp.watch(bases.src+'/styles/scss/**/*.*', ['hologram', 'webpack:build']);
  gulp.watch(bases.src+'./src/**/*.*', ['webpack:build']);
  callback();
});

// ------------------------------------------------
// MINIFIED BUILD
// ------------------------------------------------

gulp.task('build:dev', ['move'], function(callback) {
  callback();
});


