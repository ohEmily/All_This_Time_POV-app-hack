var css = require("../../../styles/css/main.css");
var React = require("react");
var App = require("./views/app.jsx");
var Fluxxor = require("fluxxor");
var AppStore = require("./stores/app-store.js");
var AssetStore = require("./stores/asset-store.js");
var AppActions = require("./actions/app-actions.js");
var AssetConstants = require("./constants/asset-constants.js");

module.exports = {

  flux: null,
  stores: null,
  actions: null,
  el: null,


  init: function() {

    this.stores = {
      AppStore: new AppStore(),
      AssetStore: new AssetStore()
    };

    this.actions = AppActions;
    this.flux = new Fluxxor.Flux(this.stores, this.actions);

    // dev, output dispatch logs
    this.flux.on("dispatch", function(type, payload) {
      if (console && console.log) {
        console.log("[Dispatch]", type, payload);
      }
    });

    // start the asset load
    this.flux.actions.preloadAssets(AssetConstants);

    window.onbeforeunload = this.remove.bind(this);

    this.ready();

  },

  ready: function() {

    window.React = React;

    this.el = document.createElement("div");
    document.body.appendChild(this.el);
    React.render(
      <App flux={this.flux} />,
      this.el
    );
  },

  remove: function() {
    if(this.el && this.el.parentNode) document.body.removeChild(this.el);
  }

}