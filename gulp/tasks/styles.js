/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import csso from 'postcss-csso';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import nodeSass from 'node-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import wait from 'gulp-wait';
import { paths, isDevelopment } from '../configuration';
import server from './server';

sass.compiler = nodeSass;

function compileStyles() {
  return gulp
    .src(paths.styles.src)
    .pipe(wait(100))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(!isDevelopment, postcss([
      autoprefixer({
        cascade: false,
        remove: false,
      }),
      cssMqpacker({
        sort: true,
      }),
      csso({
        comments: false,
      }),
    ])))
    .pipe(rename({
      basename: 'main',
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileStyles',
    })))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpIf(isDevelopment, server.stream()));
}

export default compileStyles;
