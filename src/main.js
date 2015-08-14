'use strict';

var assign = require('lodash/object/extend');

var helper = require('./helper');
var politicalBorders = require('./political-borders');
var heatmap = require('./heatmap');

var planet = assign({}, helper, politicalBorders, heatmap);

module.exports = planet;