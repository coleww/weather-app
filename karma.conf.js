//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './public/js',

    files: [
      '../vendor/angular.min.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      '*/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
