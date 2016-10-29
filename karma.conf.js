//jshint strict: false
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '**/*.js': ['jshint']
    },
    basePath: './public/js',

    files: [
      '../vendor/angular.min.js',
      '../vendor/moment.min.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      '**/*.js',
      'components/*/*.html'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-jshint-preprocessor'
    ],

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      cacheIdFromPath: function(filepath) {
        return 'js/' + filepath;
      }
    }

  });
};
