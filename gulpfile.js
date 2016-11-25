/* eslint-disable quote-props */

// List all available tasks

const src = 'src';
const dest = 'dist';
const path = require('path');
const relativePath = (...args) => path.join(__dirname, ...args);

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'flow-transpile-to-es5': {
    src: relativePath(src, '/js/main.js'),
    dest,
    rename: 'time-tracker.js',
  },
  'flow-typecheck': {
    src: relativePath(src, '/js/**/*.js'),
  },
  'build': {
    src: './',
    tasks: ['flow-typecheck', 'flow-transpile-to-es5', 'sass'],
  },
  'browser-sync': {
    src: '.', // it doesn't matter, it's just so the task object is not ignored.
    reloadOn: ['flow-transpile-to-es5', 'sass'], // reload page when these tasks happen
    startPath: 'examples/widget/index.html',
    baseDir: './',
  },
  'sass': {
    src: path.join(src, 'styles/**/*.scss'),
    dest,
    rename: 'time-tracker.css'
  },
});
