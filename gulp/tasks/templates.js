/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import prettier from 'gulp-prettier';
import pug from 'gulp-pug';
import size from 'gulp-size';
import { paths, isDevelopment } from '../configuration';

function compileTemplates() {
  return gulp
    .src(paths.templates.src)
    .pipe(pug())
    .pipe(gulpIf(!isDevelopment, prettier()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileTemplates',
    })))
    .pipe(gulp.dest(paths.templates.dest));
}

export default compileTemplates;
