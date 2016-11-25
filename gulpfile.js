/* eslint-disable quote-props */

// List all available tasks

const src = 'src';
const dest = 'dist';
const path = require('path');
const relativePath = (...args) => path.join(__dirname, ...args);

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'flow-transpile-to-es5': {
    src: relativePath(src, 'main.js'),
    dest,
  },
  'build': {
    src: './',
    tasks: [],
  },
});
