var React = require("react/addons");
require("gsap");
require("gsap-react-plugin");
var Q = require('q');
var ButtonAlpha = require("../buttons/button-alpha.jsx");
var BlockHomeLogo = require("./block-home-logo-lofi.js");
var BlockReviewQuote = require("./block-review-quote.js");
var BlockReviewCarousel = require("./block-review-carousel.js");


module.exports = React.createClass({

  introAnimationDeferred: null,
  loadingProgressDeferred: null,

  getDefaultProps: function() {
    return {
      modifier: null,
      skipIntro: false
    }
  },

  getInitialState: function() {
    return {
      animationProgress: 0,
      loadingProgress: 0,
      logoAnimate: true,
      starringAnimate: true,
      directorsAnimate: true,
      ctaAnimate: true,
      logoActive: false,
      starringActive: false,
      directorsActive: false,
      ctaActive: false,
      reviewActive: false
    }
  },

  componentWillMount: function () {

    if(this.props.skipIntro) {
      this.setState({
        logoAnimate: false,
        starringAnimate: false,
        directorsAnimate: false,
        ctaAnimate: false,
        logoActive: false,
        starringActive: false,
        directorsActive: false,
        ctaActive: false,
        reviewActive: false
      })
    }else{
      this.loadingProgressTimeline = new TimelineMax({onComplete: this.onUpdateLoadingProgress});
      this.loadingProgressTimeline.pause();
      this.loadingProgressTimeline.fromTo(this, 1.5, {state: {loadingProgress: 0}}, {state: {loadingProgress: 1}});
    }
  },

  componentWillUnmount: function () {
    if(this.loadingProgressTimeline) {
      this.loadingProgressTimeline.kill();
      this.loadingProgressTimeline = null;
    }
    if(this.loadingProgressTimeline) {
      this.loadingProgressTimeline.kill();
      this.loadingProgressTimeline = null;
    }
    TweenMax.killAll();
  },

  updateLoadingProgress: function(progress) {
    var that = this;
    var tweenToTime = this.loadingProgressTimeline.duration()*progress;
    this.loadingProgressTimeline.tweenTo(tweenToTime);
    if(!this.loadingProgressDeferred) this.loadingProgressDeferred = Q.defer();
    return this.loadingProgressDeferred.promise;
  },

  onUpdateLoadingProgress: function() {
    if(this.loadingProgressDeferred) {
      this.loadingProgressDeferred.resolve();
    }else{
      this.loadingProgressDeferred = Q.defer();
      this.loadingProgressDeferred.resolve();
    }
  },

  startIntroAnimation: function() {
    if(this.introAnimationDeferred) return this.introAnimationDeferred.promise;
    this.setState({
      logoActive: true
    })
    this.updateLoadingProgress(1);
    this.introAnimationDeferred = Q.defer();
    TweenMax.fromTo(this, 1.5, {state: {animationProgress: 0}}, {state: {animationProgress: 1}, delay:0 , ease: Power1.easeOut, onComplete: this.onCompleteIntroAnimation});
    return this.introAnimationDeferred.promise;
  },

  onCompleteIntroAnimation: function() {
    this.introAnimationDeferred.resolve();
  },

  startRevealAnimation: function() {
    var deferred = Q.defer();
    this.animateInText();

    // awesome way to set up a delayed callback
    Q()
      .delay(600)
      .then(deferred.resolve);

    return deferred.promise;
  },

  animateInText: function() {
    this.setState({
      starringActive: true,
      directorsActive: true
    })
  },

  startRevealNavigationAnimation: function() {
    var deferred = Q.defer();
    this.setState({
      ctaActive: true,
      reviewActive: true
    })

    // awesome way to set up a delayed callback
    Q()
      .delay(500)
      .then(deferred.resolve);

    return deferred.promise;
  },

  render: function() {

    console.log("block home intro");

    var logoClassSet = {
      "block-home-intro__logo": true,
      // "block-home-intro__logo--animate": true,
      // "block-home-intro__logo--animate-in": this.state.logoActive,
    }

    var starringClassSet = {
      "block-home-intro__starring": true,
      "block-home-intro__starring--animate": this.state.starringAnimate,
      "block-home-intro__starring--animate-in": this.state.starringActive,
    }

    var directorsClassSet = {
      "block-home-intro__directors": true,
      "block-home-intro__directors--animate": this.state.directorsAnimate,
      "block-home-intro__directors--animate-in": this.state.directorsActive,
    }

    var ctaClassSet = {
      "block-home-intro__cta": true,
      "block-home-intro__cta--animate": this.state.ctaAnimate,
      "block-home-intro__cta--animate-in": this.state.ctaActive,
    }

    var blockHomeLogoPartial = null;
    blockHomeLogoPartial = <BlockHomeLogo fillStyle="#d2cdbf" bgStyle="#69665f" loadingProgress={this.state.loadingProgress} animationProgress={this.state.animationProgress} />

    return  (<div className="block-home-intro">
                <div className={React.addons.classSet(starringClassSet)}>
                  <ul className="block-home-intro__starring__list">
                    <li className="block-home-intro__starring__list__item">
                      <span className="label label-alpha label-alpha--small">Lexi</span><br/>
                      <span className="label label-alpha label-alpha--large">Johnson</span>
                    </li>
                    <li className="block-home-intro__starring__list__item">
                      <span className="label label-alpha label-alpha--small">Christian</span><br/>
                      <span className="label label-alpha label-alpha--large">Cooke</span>
                    </li>
                    <li className="block-home-intro__starring__list__item">
                      <span className="label label-alpha label-alpha--small">Andrew</span><br/>
                      <span className="label label-alpha label-alpha--large">Sensing</span>
                    </li>
                  </ul>
                </div>
                <div className={React.addons.classSet(logoClassSet)}>
                  {blockHomeLogoPartial}
                </div>
                <div className={React.addons.classSet(directorsClassSet)}>
                  <span className="label label-alpha" ref="credits">A FILM BY DAN DIFELICE & SALOMON LIGTHELM</span>
                </div>
                <div className={React.addons.classSet(ctaClassSet)}>
                  <ButtonAlpha>Q &amp; A Live Event</ButtonAlpha>
                </div>

              </div>)
  }

})