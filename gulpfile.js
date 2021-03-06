/* eslint-disable quote-props */

// List all available tasks

const src = 'src';
const dest = 'dist';
const path = require('path');
const relativePath = (...args) => path.join(__dirname, ...args);

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'transpile-react': {
    application: {
      watch: [
        relativePath(src, '/js/**/*.js'),
        relativePath(src, '/tests/**/*.js'),
      ],
      src: relativePath(src, '/js/main.js'),
      dest,
      rename: 'time-tracker.js',
      config: {
        moduleName: 'timeTracker',
        // external: ['react', 'react-dom'],
        paths: {
          'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react',
          'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react-dom',
        },
      },
    },
    tests: {
      src: relativePath(src, '/tests/index.js'),
      dest,
      rename: 'time-tracker-tests.js',
      config: {
        moduleName: 'timeTrackerTests',
        external: ['react', 'react-dom'],
        paths: {
          'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react',
          'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react-dom',
        },
      },
    },
  },
  'build': {
    src: './',
    tasks: ['copy-static', 'transpile-react', 'sass'],
  },
  'browser-sync': {
    src: '.', // it doesn't matter, it's just so the task object is not ignored.
    reloadOn: ['transpile-react', 'sass'], // reload page when these tasks happen
    startPath: 'examples/widget/index.html',
    baseDir: './',
  },
  'sass': {
    watch: path.join(src, 'styles/**/*.scss'),
    src: path.join(src, 'styles/main.scss'),
    dest,
    rename: 'time-tracker.css',
  },
  'copy-static': {
    src: 'node_modules/jasmine-core/**/*',
    dest: 'examples/widget/jasmine-core',
    map: {},
  },
  'test-headless': {
    src: 'dist/*-tests.js',
  },
});
