var React = require("react/addons");
var TextSelect = require('react-textselect');
var MouthNumberNth = require("mout/number/nth");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
    }
  },

  getInitialState: function () {
    return {
      selectedLossIndex: 0,
      selectedMonthIndex: 0,
      selectedDateIndex: 0,
      selectedYearIndex: 0
    };
  },

  onTextSelectChange: function(e, index, value) {
    this.setState({
      selectedLossIndex: index
    })
  },

  onTextMonthChange: function(e, index, value) {
    this.setState({
      selectedMonthIndex: index
    })
  },

  onTextDateChange: function(e, index, value) {
    this.setState({
      selectedDateIndex: index
    })
  },

  onTextYearChange: function(e, index, value) {
    console.log("NEW INDEX: "+index);
    console.log(index);
    console.log(value);
    this.setState({
      selectedYearIndex: index
    })
  },

  render: function() {

    var classes = {
      "block-home-input" : true
    };

    var lossOptions = [
      'Father',
      'Mother',
      'Brother',
      'Sister',
      'Grandmother',
      'Grandfather',
      'Husband',
      'Wife',
      'Friend'
    ];

    var monthOptions = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var dateOptions = [
    ];

    for(var i = 1; i<=31; i++) {
      dateOptions.push(i+MouthNumberNth(i));
    }

    var yearOptions = [
    ];

    for(var j = 2015; j>1955; j--) {
      yearOptions.push(j.toString());
    }

    return  (<div className={React.addons.classSet(classes)}>
              <h2>I lost my <TextSelect
                            options={lossOptions}
                            active={this.state.selectedLossIndex}
                            onChange={this.onTextSelectChange}/> on <TextSelect
                            options={monthOptions}
                            active={this.state.selectedMonthIndex}
                            onChange={this.onTextMonthChange}/> <TextSelect
                            options={dateOptions}
                            active={this.state.selectedDateIndex}
                            onChange={this.onTextDateChange}/> <TextSelect
                            options={yearOptions}
                            active={this.state.selectedYearIndex}
                            onChange={this.onTextYearChange}/></h2>
            </div>);
  }

})