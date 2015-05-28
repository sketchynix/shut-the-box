'use strict';

var React = require('react/addons');
var Card = require('Card');
var Dice = require('Dice');

// CSS
require('normalize.css');
require('../styles/main.css');

var ShutTheBoxApp = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return (
      <div className='shut-the-box-game-wrap' role="main">
      </div>
    );
    /* jshint ignore:end */
  }
});

React.render(<ShutTheBoxApp />, document.getElementById('content'));

module.exports = ShutTheBoxApp;
