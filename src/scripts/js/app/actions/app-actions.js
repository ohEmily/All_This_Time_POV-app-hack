var AppConstants = require("../constants/app-constants.js");
var Q = require("q");
var Qimage = require("qimage");

module.exports = {

  setPage: function(page) {
    this.dispatch(AppConstants.SET_PAGE, {page:page})
  },

  setReadyState: function(ready) {
    this.dispatch(AppConstants.SET_READY_STATE, {ready:ready})
  },

  setChapter: function(chapter) {
    alert("SET CHAPTER: "+chapter);
    this.dispatch(AppConstants.SET_CHAPTER, {chapter:chapter})
  },

  preloadAssets: function(assets) {
    console.log('prealod these assets: '+assets.toString());

    // init
    var that = this;
    this.dispatch(AppConstants.LOAD_ASSETS);

    // set up assets list
    var qAssetsProgress = 0;
    var qAssetsLoadedCount = 0;
    var qAssets = assets.map(function(asset) {
      return Qimage(asset);
    });

    // LOAD PROGRESS
    qAssets.forEach(function(assetPromise) {
      assetPromise.then(function(asset) {
        qAssetsLoadedCount++;
        qAssetsProgress = qAssetsLoadedCount/qAssets.length;
        console.log("qAssetsProgress: "+qAssetsProgress);
        that.dispatch(AppConstants.LOAD_ASSETS_PROGRESS, {progress: qAssetsProgress});
      });
    });

    // LOAD COMPLETE
    Q.all(qAssets)
      .progress(function() {
        console.log("PROGRESS");
      })
      .then(function (assets) {
        console.log("done loading assets"+assets);
        setTimeout(function() {
          that.dispatch(AppConstants.LOAD_ASSETS_SUCCESS, {assets: assets});
        }, 100);
      })
      .fail(function(assets) {
        alert("error loading images");
        // console.log(assets);
        that.dispatch(AppConstants.LOAD_ASSETS_FAIL, {error: "error loading image"});
      });
  }

}