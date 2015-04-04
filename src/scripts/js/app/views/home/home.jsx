var React = require("react");
var HomeNav = require("./nav.jsx");
var HomeContentStart = require('./home-content-start.jsx');
var HomeContentMenu = require('./home-content-menu.jsx');
var Q = require('q');
var Components = require("../../../components/index.jsx");
var HomePageBackground = require("../../../../../assets/images/home/hero.jpg");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  loadingProgressPromise: null,
  readyDefer: null,

  // --------------------------------------------------
  // EVENTS

  onStartClick: function() {
    this.setState({
      displayContentMenu: true
    })
  },

  // --------------------------------------------------
  // LIFECYCLE

  getDefaultProps: function() {
    return {
      loadingProgress: 0,
      ready: false,
      skipIntro: false
    }
  },

  getInitialState: function() {
    return {
      bgAnimate: true,
      navAnimate: true,
      ctaAnimate: true,
      loadingAnimate: true,
      bgActive: false,
      navActive: false,
      ctaActive: false,
      loadingActive: true,
      displayContentMenu: false
    }
  },

  componentWillMount: function () {
    this.readyDefer = Q.defer();
    if(this.props.skipIntro) {
      this.setState({
        bgAnimate: false,
        navAnimate: false,
        ctaAnimate: false,
        loadingAnimate: false,
        bgActive: false,
        navActive: false,
        ctaActive: false,
        loadingActive: false
      })
    }
  },

  componentDidMount: function () {
    if(!this.props.skipIntro) {
      if(this.refs.intro) {
        this.loadingProgressPromise = this.refs.intro.updateLoadingProgress(this.props.loadingProgress);
      }
      this.startAnimation();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    console.log('nextProps.ready: '+nextProps.ready);
    if(this.props.ready!==nextProps.ready && nextProps.ready===true) {
      this.readyDefer.resolve();
    }
  },

  // --------------------------------------------------
  // ANIMATIONS
  startIntroAnimation: function() {
    if(this.refs.intro) {
      return this.refs.intro.startIntroAnimation();
    }else{
      return null;
    }
  },

  startBackgroundAnimation: function() {
    var deferred = Q.defer();
    this.setState({
      loadingActive: false,
      bgActive: true
    })

    // awesome way to set up a delayed callback
    // duration is 4000ms
    Q()
      .delay(2500)
      .then(deferred.resolve)
      .done();

    return deferred.promise;
  },

  startRevealAnimation: function() {
    if(this.refs.intro) {
      return this.refs.intro.startRevealAnimation();
    }else{
      return null;
    }
  },

  startRevealNavigationAnimation: function() {

    if(this.refs.intro) {
      this.refs.intro.startRevealNavigationAnimation();
    }

    var deferred = Q.defer();
    this.setState({
      navActive: true,
      ctaActive: true
    })

    // awesome way to set up a delayed callback
    Q()
      .delay(2000)
      .then(deferred.resolve)
      .done();

    return deferred.promise;
  },

  startAnimation: function() {

    var that = this;
    that.readyDefer.promise
      .then(function() {
        return Q.all([that.startBackgroundAnimation(), that.startIntroAnimation()])
      })
      .then(function() {
        return that.startRevealAnimation();
      })
      .then(function() {
        return that.startRevealNavigationAnimation();
      })
      .then(function() {
        if(that.props.onAnimationComplete) that.props.onAnimationComplete();
      })
      .done();
  },
  // --------------------------------------------------

  render: function() {

    var bgClassSet = {
      "home-page__bg": true,
      "home-page__bg--animate": this.state.bgAnimate,
      "home-page__bg--animate-in": this.state.bgActive,
    }

    // var navClassSet = {
    //   "home-page__nav": true,
    //   "home-page__nav--animate": this.state.navAnimate,
    //   "home-page__nav--animate-in": this.state.navActive,
    // }

    var ctaClassSet = {
      "home-page__cta": true,
      "home-page__cta--animate": this.state.ctaAnimate,
      "home-page__cta--animate-in": this.state.ctaActive,
    }

    // var loadingClassSet = {
    //   "home-page__loading": true,
    //   "home-page__loading--animate": this.state.loadingAnimate,
    //   "home-page__loading--animate-out": !this.state.loadingActive,
    // }

    var videoPartial = null;
    //   videoPartial =  (<Components.Blocks.BlockTVFilter visible={this.props.visible}
    //                       srcPoster={HomePageBackground}
    //                       srcWebM="./assets/video/homepage_vid.webm"
    //                       srcMP4="./assets/video/homepage_vid.mp4">
    //                     </Components.Blocks.BlockTVFilter>);

    // var blockHomeIntroLoadingProgress = (this.props.skipIntro) ? 1 : this.props.loadingProgress;

    // var blockHomeIntro = <Components.Blocks.BlockHomeIntro ref="intro" skipIntro={this.props.skipIntro} loadingProgress={blockHomeIntroLoadingProgress} />
    var blockHomeIntro = <Components.Blocks.BlockHomeLogo></Components.Blocks.BlockHomeLogo>;

    var bodyPartial = null;
    // bodyPartial = (<div className="home-page__body">
    //                 <Components.Blocks.BlockAlign>
    //                   {blockHomeIntro}
    //                  </Components.Blocks.BlockAlign>
    //               </div>);

    bodyPartial = (this.state.displayContentMenu) ? <HomeContentMenu key="menu" />: <HomeContentStart key="start" />;

    // var loaderPartial = (<div className={React.addons.classSet(loadingClassSet)}>
    //             <div className="home-page__loading__loader">
    //               <Components.Blocks.BlockSiteLoader loadingProgress={this.props.loadingProgress} onEnterClick={this.onEnterClick} />
    //             </div>
    //             <div className="home-page__loading__logo">
    //               <div className="block-sypher-logo">
    //               </div>
    //             </div>
    //           </div>);

    return (<div className="home-page">
              <div className={React.addons.classSet(bgClassSet)}>
                {videoPartial}
              </div>
              <div className="home-page__body">
                <React.addons.CSSTransitionGroup transitionName="global-animation__transition-alpha">
                  {bodyPartial}
                </React.addons.CSSTransitionGroup>
              </div>
              <div className={React.addons.classSet(ctaClassSet)}>
                <Components.Buttons.ButtonAlpha onClick={this.onStartClick}>Start</Components.Buttons.ButtonAlpha>
              </div>
            </div>);
    //           <div className={React.addons.classSet(navClassSet)}>
    //             <HomeNav />
    //           </div>
    //           {bodyPartial}
    //           <div className={React.addons.classSet(ctaClassSet)}>
    //             <Components.Blocks.BlockScrollCTA active={this.state.ctaActive}>Scroll to Navigate</Components.Blocks.BlockScrollCTA>
    //           </div>
    //           {loaderPartial}
            // </div>);
  }

})