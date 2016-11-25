/* eslint-disable global-require */
const gulp = require('gulp');
const organiser = require('gulp-organiser');
const flow = require('gulp-flowtype');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    return gulp.src(task.src)
      .pipe(flow({
        all: false,
        weak: false,
        declarations: task.declarations,
        killFlow: false,
        beep: true,
        abort: false
      }));
  });
});
