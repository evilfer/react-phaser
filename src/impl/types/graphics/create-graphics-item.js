'use strict';

var treeUtils = require('../../tree-utils'),
    create = function (draw) {

    var requestNotification = function (node, tree, treeMethods) {
            var graphics = treeUtils.parent(node, tree, 'graphics');
            if (graphics) {
                treeMethods.requestTransactionNofitication(graphics.id);
            }
        },

        update = function (node, prevProps, tree, treeMethods) {
            if (treeUtils.propsChanged(node.props, prevProps)) {
                requestNotification(node, tree, treeMethods);
            }
        },


        drawWrapper = function (node, tree, graphics, x0, y0) {
            var fill = typeof node.props.fill !== 'undefined',
                line = typeof node.props.stroke!== 'undefined' ||
                    typeof node.props.strokeWidth !== 'undefined' ||
                    typeof node.props.strokeAlpha !== 'undefined';

            if (fill) {
                var fillColor = typeof node.props.fill !== 'undefined' ? node.props.fill : 0x000000,
                    fillAlpha = typeof node.props.fillAlpha === 'number' ? node.props.fillAlpha : 1;
                graphics.beginFill(fillColor, fillAlpha);
            }
            if (line) {
                var lineColor = typeof node.props.stroke !== 'undefined' ? node.props.stroke : 0x000000,
                    lineAlpha = typeof node.props.strokeAlpha === 'number' ? node.props.strokeAlpha : 1,
                    lineWidth = typeof node.props.strokeWidth === 'number' ? node.props.strokeWidth : 1;
                graphics.lineStyle(lineWidth, lineColor, lineAlpha);
            } else {
                graphics.lineStyle(0);
            }

            draw(node, tree, graphics, x0, y0);

            if (fill) {
                graphics.endFill();
            }
        };

    return {
        init: requestNotification,
        kill: requestNotification,
        update: update,
        draw: drawWrapper
    };
};

module.exports = create;
