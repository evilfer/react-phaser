'use strict';

var extend = require('extend'),
    properties = require('../properties'),

    addNodeDisplayObject = function (nodes, wrapper) {
        var parent = nodes.byId(wrapper.parent),
            group = parent.tag === 'game' ? parent.obj.world : parent.obj;

        group.add(wrapper.obj);
    },

    genPropertyUpdate = function (groups) {
        if (!Array.isArray(groups)) {
            groups = [groups];
        }
        groups = groups.map(function (key) {
            return properties[key]
        });
        groups.unshift({});

        var props = extend.apply(null, groups);
        return function (nodes, node, changeProps = Object.keys(node.props), prevProps = null) {
            for (var i = 0; i < changeProps.length; i++) {
                var prop = changeProps[i];
                var propertyUpdate = props[prop];
                if (propertyUpdate) {
                    propertyUpdate(nodes, node, node.props[prop], !prevProps, prevProps && prevProps[prop]);
                }
            }
        }
    };

module.exports = {
    addNodeDisplayObject: addNodeDisplayObject,
    genPropertyUpdate: genPropertyUpdate
};
