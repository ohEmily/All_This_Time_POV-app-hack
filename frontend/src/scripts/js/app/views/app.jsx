var React = require("react");
var Home = require("./home/home.jsx");
// var Info = require("./info/info.jsx");
// var Watch = require("./watch/watch.jsx");
// var HUD   = require("./hud.jsx");
var Rebound = require("rebound");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("AppStore", "AssetStore")],

  getInitialState: function() {
    return {
      homeAnimationComplete: false
    }
  },

  getReadyState: function() {
    if(this.state.assetStore.loaded && this.state.homeAnimationComplete) {
      return true;
    }else{
      return false;
    }
  },

  getLoadingState: function() {
    // max loading progress is 99% until loaded returns true;
    if(!this.state.assetStore.loaded) {
      return Math.min(this.state.assetStore.progress, 0.99);
    }else{
      return 1;
    }
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      appStore: flux.store("AppStore").getState(),
      assetStore: flux.store("AssetStore").getState()
    };
  },

  onHomeAnimationComplete: function() {
    this.setState({
      homeAnimationComplete: true
    })
  },

  nextPage: function() {
    if(!this.state.assetStore.loaded) return;
    if(this.currentPage<(this.totalPages-1)) {
      this.currentPageTimeout = setTimeout(this.onCurrentPageTimeoutComplete, 1000);
      this.setPage(this.state.appStore.page+1);
    }
  },

  previousPage: function() {
    if(!this.state.assetStore.loaded) return;
    if(this.currentPage>0) {
      this.currentPageTimeout = setTimeout(this.onCurrentPageTimeoutComplete, 1000);
      this.setPage(this.state.appStore.page-1);
    }
  },

  executePage: function(page) {
    this.currentPage = page;
    var pagesTotalHeight = window.innerHeight*3;//this.refs.scrollContent.getDOMNode().clientHeight;
    this.windowHeight = window.innerHeight;
    var availableHeight = pagesTotalHeight - this.windowHeight;
    var scrollY = (this.currentPage/(this.totalPages-1))*availableHeight;
    this.setState({
      nextPosition: scrollY
    });
    this.isScrolling = true;

    // if(!this.animationFrame) {
    //   this.animationFrame = requestAnimationFrame( this.animationLoop );
    // }
  },

  animationLoop: function() {

    this.animationFrame = null;

    if(this.refs["page-wrapper"]) {
      var el = this.refs["page-wrapper"].getDOMNode();
      var st = window.getComputedStyle(el, null);

      var tr = st.getPropertyValue("-webkit-transform") ||
               st.getPropertyValue("-moz-transform") ||
               st.getPropertyValue("-ms-transform") ||
               st.getPropertyValue("-o-transform") ||
               st.getPropertyValue("transform");

      var values = tr.split('(')[1],
          values = values.split(')')[0],
          values = values.split(',');

      var yValue = -values[5];

      this.updateScroll(yValue);

      if(yValue===this.state.nextPosition) return;
    }
    if(!this.animationFrame) {
      this.animationFrame = requestAnimationFrame( this.animationLoop );
    }
  },

  updateScroll: function(value) {
    var scrollHeight = this.windowHeight*3;
    // if(this.refs["page-wrapper"]) {
    //   this.refs["page-wrapper"].getDOMNode().style.webkitTransform = "translate3d(0px, "+-value+"px, 0px)";
    // }
    if(this.refs["hud"]) {
      var scrollHeight = this.windowHeight*3;
      var scrollY = value;
      this.refs["hud"].updateScroll({scrollHeight: scrollHeight, scrollY: scrollY});
    }
  },

  onPageTransitionEnd: function(e) {
    if(this.animationFrame) cancelAnimationFrame(this.animationFrame);
  },

  onTransitionEnd: function(e) {
    if(e.target===this.refs["page-wrapper"].getDOMNode()) {
      this.isScrolling = false;
      this.forceUpdate();
    }
  },

  render: function() {

    // app states
    var ready = this.getReadyState();
    var loadingProgress = this.getLoadingState();

    // var page0Enabled = (this.state.appStore.page===0 && !this.isScrolling);
    // var page1Enabled = (this.state.appStore.page===1 && !this.isScrolling);
    // var page2Enabled = (this.state.appStore.page===2 && !this.isScrolling);

    // var page0Visible = (this.state.appStore.page===0 || (this.isScrolling && this.state.appStore.prevPage===0));
    // var page1Visible = (this.state.appStore.page===1 || (this.isScrolling && this.state.appStore.prevPage===1));
    // var page2Visible = (this.state.appStore.page===2 || (this.isScrolling && this.state.appStore.prevPage===2));

    var page0Partial = null;
    // var page1Partial = null;
    // var page2Partial = null;

    page0Partial = <Home
                      flux={this.props.flux}
                      loadingProgress={loadingProgress}
                      ready={this.state.assetStore.loaded} />;
                      
    // page1Partial = <Info
    //                   enabled={page1Enabled}
    //                   visible={page1Visible} />;
    // page2Partial = <Watch
    //                   enabled={page2Enabled}
    //                   visible={page2Visible} />;

    var hudPartial = null;
    if(this.state.homeAnimationComplete) {
      hudPartial = <HUD ref="hud" expanded={(this.state.appStore.page===2)} />
    }

    var pagesStyle = {};
    pagesStyle.display = "block";
    pagesStyle.width = "100%";
    pagesStyle.height = "100%";
    // pagesStyle.webkitTransform = pagesStyle.mozTransform = pagesStyle.msTransform = pagesStyle.transform = "translate3d(0px, 0px, 0px)";

    return <div className="app">
            <div className="app__content" style={pagesStyle} ref="page-wrapper">
              <div className="pages">
                <div className="page">{page0Partial}</div>
              </div>
            </div>
            {hudPartial}
          </div>
  }

})