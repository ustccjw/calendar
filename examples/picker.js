/** @jsx React.DOM */
require('bootstrap/dist/css/bootstrap.css');
require('rc-calendar/assets/bootstrap.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var zhCn = require('gregorian-calendar/lib/locale/zh-cn'); // spm error
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var CalendarLocale = require('../lib/locale/zh-cn');

var Test = React.createClass({
  open: function () {
    this.refs.picker.setState({
      open: true
    });
  },

  handleChange: function (value) {
    console.log('DatePicker change: ' + (value && this.props.formatter.format(value)));
  },

  handleCalendarSelect: function (value) {
    console.log('calendar select: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState: function () {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
      value: value
    };
  },

  handleShowTimeChange: function (e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  render: function () {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
      orient={['top', 'left']}
      showTime={this.state.showTime} onSelect={this.handleCalendarSelect} onClear={this.handleCalendarSelect.bind(this,null)} showClear={true}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={this.state.time}>
      <div className="input-group">
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} />
          showTime</span>
      </div>
      <div className="input-group">
        <DatePicker ref='picker' formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
          <input type="text" className="form-control" style={{background: 'white', cursor: 'pointer'}}/>
        </DatePicker>
        <span className="input-group-addon" onClick={this.open}>
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    </div>;
  }
});

React.render(<div>
  <h1>zh-cn</h1>
  <Test />
</div>, document.getElementById('__react-content'));
