var Fluxxor = require("fluxxor");
var AppConstants = require("../constants/app-constants.js");

var AssetStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.loaded = false;
    this.error = null;
    this.progress = 0;
    this.assets = [];

    this.bindActions(
      AppConstants.LOAD_ASSETS, this.onLoadAssets,
      AppConstants.LOAD_ASSETS_PROGRESS, this.onLoadAssetsProgress,
      AppConstants.LOAD_ASSETS_SUCCESS, this.onLoadAssetsSuccess,
      AppConstants.LOAD_ASSETS_FAIL, this.onLoadAssetsFail
    );
  },

  onLoadAssets: function(payload) {
    this.loading = true;
    this.loaded = false;
  },

  onLoadAssetsProgress: function(payload) {
    this.progress = payload.progress;
    this.emit("change");
  },

  onLoadAssetsSuccess: function(payload) {
    this.loading = false;
    this.error = null;
    this.assets = payload.assets;
    this.loaded = true;
    this.emit("change");
  },

  onLoadAssetsFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.loaded = false;
    this.emit("change");
  },

  getState: function() {
    return {
      loading: this.loading,
      loaded: this.loaded,
      progress: this.progress,
      error: this.error,
      assets: this.assets
    };
  }
});

module.exports = AssetStore;