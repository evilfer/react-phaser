'use strict';

var create = function (draw) {

    var requestNotification = function (nodes, node) {
            var graphics = nodes.parent(node, 'graphics');
            if (graphics) {
                nodes.requestTransactionNofitication(graphics.id);
            }
        },

        requestNotificationOnUpdate = function (nodes, node, changeProps) {
            if (changeProps.length > 0) {
                requestNotification(nodes, node);
            }
        },


        drawWrapper = function (nodes, node, graphics, x0, y0) {
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

            draw(nodes, node, graphics, x0, y0);

            if (fill) {
                graphics.endFill();
            }
        };

    return {
        mount: requestNotification,
        unmount: requestNotification,
        update: requestNotificationOnUpdate,
        draw: drawWrapper
    };
};

module.exports = create;
