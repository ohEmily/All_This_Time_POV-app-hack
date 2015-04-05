module.exports = {

  appLoader: null,

  minLoadTime: 2000,
  startLoadTime: 0,

  init: function() {
    var that = this;

    this.startLoadTime = new Date().getTime();

    require.ensure(["./app/app-loader.js"], function(require) {

      that.appLoader = require("./app/app-loader.js");
      that.appLoader.init();

      var finishLoadTime = new Date().getTime();
      var diffLoadTime = finishLoadTime - that.startLoadTime;
      var waitTime = Math.max(0, that.minLoadTime - diffLoadTime);

      setTimeout(function() {
        that.initMain();
      }, waitTime);

    });

  },

  initMain: function() {
    var that = this;
    require.ensure(["./app/app.js"], function(require) {

      setTimeout(function() {
        that.appLoader.remove();
      }, 150);

      var app = require("./app/app.js");
      app.init();

    });
  }

}