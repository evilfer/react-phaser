'use strict';

var generateBasicPropMap = function (props) {
        return props.reduce(function (acc, prop) {
            acc[prop] = function (nodes, node, value) {
                node.obj[prop] = value;
            };
            return acc;
        }, {});
    },

    generatePrefixedBasicPropMap = function (prefix, props) {
        return props.reduce(function (acc, prop) {
            acc[prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = function (nodes, node, value) {
                node.obj[prefix][prop] = value;
            };
            return acc;
        }, {});
    },


    generatePointPropMap = function (props) {
        return props.reduce(function (acc, prop) {
            acc[prop] = function (nodes, node, value, isNew, prevValue) {
                var point = node.obj[prop];
                if (isNew || value.x !== prevValue.x) {
                    point.x = value.x;
                }
                if (isNew || value.y !== prevValue.y) {
                    point.y = value.y;
                }
            };
            acc[prop + 'X'] = function (nodes, node, value) {
                node.obj[prop].x = value;
            };
            acc[prop + 'Y'] = function (nodes, node, value) {
                node.obj[prop].y = value;
            };
            return acc;
        }, {});
    },

    generatePrefixedPointPropMap = function (prefix, props) {
        return props.reduce(function (acc, prop) {
            var prefixedProp = prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
            acc[prefixedProp] = function (nodes, node, value, isNew, prevValue) {
                var point = node.obj[prefix][prop];
                if (isNew || value.x !== prevValue.x) {
                    point.x = value.x;
                }
                if (isNew || value.y !== prevValue.y) {
                    point.y = value.y;
                }
            };
            acc[prefixedProp + 'X'] = function (nodes, node, value) {
                node.obj[prefix][prop].x = value;
            };
            acc[prefixedProp + 'Y'] = function (nodes, node, value) {
                node.obj[prefix][prop].y = value;
            };
            return acc;
        }, {});
    };

module.exports = {
    generateBasicPropMap: generateBasicPropMap,
    generatePrefixedBasicPropMap: generatePrefixedBasicPropMap,
    generatePointPropMap: generatePointPropMap,
    generatePrefixedPointPropMap: generatePrefixedPointPropMap
};
