var _ = {
    extend: require('lodash/object/extend')
};

var helper = require('./helper');
var politicalBorders = require('./political-borders');

var planet = _.extend({}, helper, politicalBorders);

module.exports = planet;