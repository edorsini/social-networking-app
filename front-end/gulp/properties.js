'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var gulpNgConfig = require('gulp-ng-config');

gulp.task('properties', function () {
    // Build configuration module
    return gulp.src(path.join(conf.paths.conf, 'properties.json'))
        .pipe(gulpNgConfig('app.config',
                           {environment: process.env.NODE_ENV || 'dev'}))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
});