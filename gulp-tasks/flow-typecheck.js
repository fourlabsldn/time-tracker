/* eslint-disable global-require */
const gulp = require('gulp');
const organiser = require('gulp-organiser');
const flow = require('gulp-flowtype');

const DEFAULT_CONFIG = {
  all: false,
  weak: false,
  declarations: undefined,
  killFlow: false,
  beep: true,
  abort: true,
};

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    const config = Object.assign({}, DEFAULT_CONFIG, task.config);

    return gulp.src(task.src)
      .pipe(flow(config));
  });
});
