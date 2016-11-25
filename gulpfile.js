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
    tasks: ['flow-typecheck', 'flow-transpile-to-es5'],
  },
});
