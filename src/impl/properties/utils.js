'use strict';

var invariant = require('invariant'),

    generateBasicPropMap = function (props) {
        return props.reduce(function (acc, prop) {
            acc[prop] = function (node, value) {
                node.obj[prop] = value;
            };
            return acc;
        }, {});
    },

    generatePrefixedBasicPropMap = function (prefix, props) {
        return props.reduce(function (acc, prop) {
            acc[prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = function (node, value) {
                node.obj[prefix][prop] = value;
            };
            return acc;
        }, {});
    },


    generatePointPropMap = function (props) {
        return props.reduce(function (acc, prop) {
            acc[prop] = function (node, value, prevValue, isNew) {
                var point = node.obj[prop];
                if (isNew || value.x !== prevValue.x) {
                    point.x = value.x;
                }
                if (isNew || value.y !== prevValue.y) {
                    point.y = value.y;
                }
            };
            acc[prop + 'X'] = function (node, value) {
                node.obj[prop].x = value;
            };
            acc[prop + 'Y'] = function (node, value) {
                node.obj[prop].y = value;
            };
            return acc;
        }, {});
    },

    generatePrefixedPointPropMap = function (prefix, props) {
        return props.reduce(function (acc, prop) {
            var prefixedProp = prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
            acc[prefixedProp] = function (node, value, prevValue, isNew) {
                var point = node.obj[prefix][prop];
                if (isNew || value.x !== prevValue.x) {
                    point.x = value.x;
                }
                if (isNew || value.y !== prevValue.y) {
                    point.y = value.y;
                }
            };
            acc[prefixedProp + 'X'] = function (node, value) {
                node.obj[prefix][prop].x = value;
            };
            acc[prefixedProp + 'Y'] = function (node, value) {
                node.obj[prefix][prop].y = value;
            };
            return acc;
        }, {});
    },

    generateAliasPropMap = function (aliases) {
        return Object.keys(aliases).reduce(function (acc, alias) {
            var prop = aliases[alias];
            acc[alias] = function (node, value) {
                node.obj[prop] = value;
            };
            return acc;
        }, {});
    },
    generateMountOnlyPropMap = function (propMap) {
        return Object.keys(propMap).reduce(function (acc, prop) {
            var impl = propMap[prop];
            acc[prop] = function (node, value, prevValue, isNew, deleted, tree) {
                if (isNew) {
                    impl(node, value, tree);
                }
            };
            return acc;
        }, {});
    },
    generateFixedPropMap = function (props) {
        return props.reduce(function (acc, prop) {
            acc[prop] = function (node, value, prevValue, isNew) {
                invariant(isNew, "Property '%s' of '%s' cannot change.", prop, node.tag);
            };
            return acc;
        }, {});
    };

module.exports = {
    generateBasicPropMap: generateBasicPropMap,
    generatePrefixedBasicPropMap: generatePrefixedBasicPropMap,
    generatePointPropMap: generatePointPropMap,
    generatePrefixedPointPropMap: generatePrefixedPointPropMap,
    generateAliasPropMap: generateAliasPropMap,
    generateMountOnlyPropMap: generateMountOnlyPropMap,
    generateFixedPropMap: generateFixedPropMap
};
