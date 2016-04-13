var nodeManager = require('./node-manager'),
    loadAssets = require('./assets'),

    preloadTags = ['assets'],

    init = function (nodes) {
        var props = nodes.gameNode.props;

        var gameImpl = {
            preload: function () {
                loadAssets(nodeManager, nodes);
            },
            create: function () {
                nodeManager.mount(nodes, nodes.gameNode);
                nodeManager.initChildren(nodes, nodes.gameNode.children.filter(function (nodeId) {
                    return preloadTags.indexOf(nodes.byId(nodeId).tag) < 0;
                }));
            },
            update: function () {
                nodes.gameNode.update();
            }
        };
        nodes.setGame(new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl));
    };

module.exports = init;
