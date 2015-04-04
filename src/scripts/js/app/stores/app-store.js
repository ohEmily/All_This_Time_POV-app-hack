var Fluxxor = require("fluxxor");
var AppConstants = require("../constants/app-constants.js");

var AppStore = Fluxxor.createStore({
  initialize: function() {
    this.page = 0;
    this.prevPage = -1;
    this.ready = false;

    this.bindActions(
      AppConstants.SET_PAGE, this.onSetPage,
      AppConstants.SET_READY_STATE, this.onSetReadyState
    );
  },

  onSetPage: function(payload) {
    if(!isNaN(parseInt(payload.page))) {
      this.prevPage = this.page;
      this.page = payload.page;
      this.emit("change");
    }
  },

  onSetReadyState: function(payload) {
    this.ready = Boolean(payload.ready);
    this.emit("change");
  },

  getState: function() {
    return {
      page: this.page,
      prevPage: this.prevPage,
      ready: this.ready
    };
  }
});

module.exports = AppStore;