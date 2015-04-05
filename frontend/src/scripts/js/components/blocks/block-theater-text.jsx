var React = require("react");
var TheaterJS = require("../../vendor/theater.js");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  theater: null,



  componentDidMount: function () {
    window.theater= this.theater =  new TheaterJS();

    var that = this;

    // var $log = this.refs.content.getDOMNode();

    this.theater
          .describe("Vader", { speed: 1, accuracy: .6, invincibility: 4 }, "#vader");

    this.theater
      .on("*", function (eventName, originalEvent, sceneName, arg) {
        var args  = Array.prototype.splice.apply(arguments, [3]),
            log   = '{\n      name: "' + sceneName + '"';

        log += ",\n      args: " + JSON.stringify(args).split(",").join(", ");
        log += "\n    }";


        // $log.innerHTML = log;
      })
      .on("say:start, erase:start", function (eventName) {
        // this refer to the TheaterJS instance.
        var self    = this,
            // The current actor is referenced as this.current
            // Its voice is the third element passed to the describe method.
            // It could be of two types: a DOM element or a function.
            current = self.current.voice;

        // TheaterJS has some useful methods such as
        // addClass, hasClass, removeClass, ...
        // Note: the "saying" class adds the blinking caret.
        // self.utils.addClass(current, "saying");
      })
      .on("say:end, erase:end", function (eventName) {
        var self    = this,
            current = self.current.voice;

        // When say or erase ends, remove the caret.
        // self.utils.removeClass(current, "saying");
        // that.refs.vader.getDOMNode().innerHtml += '<br />';

        // that.refs.vader.getDOMNode().innerHTML += "<br />";


        // this.theater
        //   .write(nextProps.label)
      });


      this.theater
        .write("Vader: "+this.props.label)



  },

  componentWillReceiveProps: function (nextProps) {
    if(this.props.label!==nextProps.label && this.theater) {
      var that = this;
      this.theater
        .say(nextProps.label)
    }
  },

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="block-theater-text">
              <div className="block-theater-text__content" id="vader" ref="vader"></div>
            </div>);
  }

})