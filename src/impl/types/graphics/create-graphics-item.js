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


        drawWrapper = function (nodes, node, graphics) {
            var fill = typeof node.props.fill !== 'undefined' ||
                    typeof node.props.fillAlpha !== 'undefined',
                line = typeof node.props.lineWidth !== 'undefined' ||
                    typeof node.props.lineColor !== 'undefined' ||
                    typeof node.props.lineAlpha !== 'undefined';

            if (fill) {
                var fillColor = typeof node.props.fill !== 'undefined' ? node.props.fill : 0x000000,
                    fillAlpha = typeof node.props.fillAlpha === 'number' ? node.props.fillAlpha : 1;
                graphics.beginFill(fillColor, fillAlpha);
            }
            if (line) {
                var lineColor = typeof node.props.lineColor !== 'undefined' ? node.props.lineColor : 0x000000,
                    lineAlpha = typeof node.props.lineAlpha === 'number' ? node.props.lineAlpha : 1,
                    lineWidth = typeof node.props.lineWidth === 'number' ? node.props.lineWidth : 1;
                graphics.lineStyle(lineWidth, lineColor, lineAlpha);
            } else {
                graphics.lineStyle(0);
            }

            draw(nodes, node, graphics);

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
