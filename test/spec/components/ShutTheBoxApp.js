'use strict';

describe('ShutTheBoxApp', function () {
  var React = require('react/addons');
  var ShutTheBoxApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ShutTheBoxApp = require('components/ShutTheBoxApp.js');
    component = React.createElement(ShutTheBoxApp);
  });

  it('should create a new instance of ShutTheBoxApp', function () {
    expect(component).toBeDefined();
  });
});
