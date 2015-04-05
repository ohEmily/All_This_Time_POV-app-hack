var appLoaderLogo = require("./views/app-loader-logo.js");

module.exports = {

  init: function() {

    this.el = document.createElement("div");
    this.el.className = "app-loader app-loader--animate";
    document.body.appendChild(this.el);

    this.logo = document.createElement('div');
    this.logo.className = "block-home-logo block-home-logo--animate block-home-logo--animate-in";
    this.logo.innerHTML = '<h1 class="block-home-logo__content"></h1>';

    this.el.appendChild(this.logo);

    var blockSiteLoader = '<h1>Loading...</h1>';

    this.siteLoader = document.createElement('div');
    this.siteLoader.className = "site-loader site-loader--animate ";
    document.body.appendChild(this.siteLoader);

    this.siteLoader.innerHTML = blockSiteLoader;

    var that = this;
    setTimeout(function() {
      that.el.className         = "app-loader app-loader--animate app-loader--animate-in";
      that.siteLoader.className = "site-loader site-loader--animate site-loader--animate-in";
      that.ready();
    }, 0)
  },

  ready: function() {

  },

  remove: function() {
    if(this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }

}