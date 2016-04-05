'use strict';

var extend = require('extend'),

    addNodeDisplayObject = function (nodes, wrapper) {
        var parent = nodes.byId(wrapper.parent),
            group = parent.tag === 'game' ? parent.obj.world : parent.obj;

        group.add(wrapper.obj);
    },


    genPropertyMapUpdate = function (props) {
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
    genPropertyMapUpdate: genPropertyMapUpdate
};
