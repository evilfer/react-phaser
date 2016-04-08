var createGraphicsNode = require('./create-graphics-item'),

    renderers = {
        circle: function (nodes, node, graphics) {
            graphics.drawCircle(
                node.props.x || 0,
                node.props.y || 0,
                node.props.diameter || 0
            );
        },
        rect: function (nodes, node, graphics) {
            graphics.drawRect(
                node.props.x || 0,
                node.props.y || 0,
                node.props.width || 0,
                node.props.height || 0
            );
        },
        line: function (nodes, node, graphics) {
            graphics.moveTo(
                node.props.x1 || 0,
                node.props.y1 || 0
            );
            graphics.lineTo(
                node.props.x2 || 0,
                node.props.y2 || 0
            );
        },
        lineto: function (nodes, node, graphics) {
            graphics.lineTo(
                node.props.x || 0,
                node.props.y || 0
            );
        },
        curveto: function (nodes, node, graphics) {
            graphics.quadraticCurveTo(
                node.props.cpx,
                node.props.cpy,
                node.props.x,
                node.props.y
            );
        },
        shape: function (nodes, node, graphics) {
            for (var i = 0; i < node.children.length; i++) {
                var child = nodes.byId(node.children[i]);
                if (renderers[child.tag]) {
                    renderers[child.tag](nodes, child, graphics);
                }
            }
        }
    };

module.exports = Object.keys(renderers).reduce(function (acc, type) {
    acc[type] = createGraphicsNode(renderers[type]);
    return acc;
}, {});
