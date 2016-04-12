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
                for (var i = 0; i < nodes.gameNode.collisions.length; i++) {
                    var c = nodes.gameNode.collisions[i];
                    nodes.gameNode.obj.physics.arcade.collide(nodes.ids[c[0]].obj, nodes.ids[c[1]].obj);
                }
                for (i = 0; i < nodes.gameNode.overlaps.length; i++) {
                    var overlap = nodes.gameNode.overlaps[i];
                    nodes.gameNode.obj.physics.arcade.overlap(
                        nodes.ids[overlap.pair[0]].obj,
                        nodes.ids[overlap.pair[1]].obj,
                        overlap.callback, null, this);
                }
                for (i = 0; i < nodes.gameNode.updateMethods.length; i++) {
                    nodes.gameNode.updateMethods[i]();
                }
            }
        };
        nodes.gameNode.obj = new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl);
    };

module.exports = init;
