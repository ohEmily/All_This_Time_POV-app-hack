/**
 * Provides smooth, hardware-accellerated ease-based scrolling for container
 * elements by normalizing scroll behavior across different browsers / platforms.
 * Works great for parallax, or simply browsing a document.
 *
 * @author  Christopher Pappas
 * @date    5.14.14
 */

var SmoothScrollMixin = {

  totalPages: 3,
  currentPage: 0,
  currentPageTimeout: null,
  windowScrollTimeout: null,
  previousScrollY: 0,
  scrollDirection: 0,
  scrollThreshold: 16,

  getInitialState: function() {
    return {
      friction: .2,
      nextPosition: 0,
      currentPosition: 0,
      scrollPercent: 0
    }
  },


  componentDidMount: function() {
    // window.addEventListener( 'scroll', this.onScroll )

    window.addEventListener("mousewheel", this.onScroll);
    window.addEventListener("scroll", this.onScroll);

    this.setupStyles()
    this.updateHeight()
    this.animationLoop()
  },


  componentDidUpdate: function() {
    this.updateHeight()
  },


  setupStyles: function() {
    this.getDOMNode().style.position = 'fixed'
  },


  updateHeight: function() {
    var $container = this.getDOMNode()
    $container.parentNode.style.height = $container.offsetHeight + 'px'
  },


  animationLoop: function() {
    var $container = this.getDOMNode()

    this.state.currentPosition += ~~(this.state.nextPosition - this.state.currentPosition) * this.state.friction
    this.state.scrollPercent    = ~~(this.state.currentPosition / (parseInt($container.parentNode.style.height) - window.innerHeight) * 100)

    // TweenLite.set( $container, {
    //   y: -this.state.currentPosition
    // })

    

    requestAnimationFrame( this.animationLoop )
  },


  onScroll: function() {

    e.preventDefault();
    e.stopPropagation();
    if(Math.abs(e.wheelDeltaY)>this.scrollThreshold && this.currentPageTimeout===null) {
      if(e.wheelDeltaY<0) {
        // this.nextPage();
      }else{
        // this.previousPage();
      }
    }
    return false;

    // this.setState({
    //   nextPosition: window.scrollY
    // })
  }
}

module.exports = SmoothScrollMixin