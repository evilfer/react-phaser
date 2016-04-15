'use strict';

var addNodeDisplayObject = function (nodes, wrapper, obj) {
        var parent = nodes.byId(wrapper.parent),
            group = parent.obj.world || parent.obj;

        group.add(obj || wrapper.obj);
    },


    genPropertyMapUpdate = function (props) {
        return function (nodes, node, changeProps, prevProps) {
            if (typeof changeProps === 'undefined') {
                changeProps = Object.keys(node.props);
            }
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
