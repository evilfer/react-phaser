var nodeManager = require('./node-manager'),
    loadAssets = require('./assets'),

    initChildren = function (nodes, children) {
        children.forEach(function (childId) {
            var child = nodes.ids[childId];
            nodeManager.mount(nodes, child);
            if (child.children.length > 0) {
                initChildren(nodes, child.children);
            }
        });
    },

    init = function (nodes) {
        var {assets = {}, width, height, mode = Phaser.AUTO} = nodes.gameNode.props;

        var gameImpl = {
            preload: function () {
                loadAssets(nodes.gameNode, assets);
            },
            create: function () {
                nodeManager.mount(nodes, nodes.gameNode);
                initChildren(nodes, nodes.gameNode.children);
            },
            update: function () {
                for (var i = 0; i < nodes.gameNode.collisions.length; i++) {
                    var c = nodes.gameNode.collisions[i];
                    nodes.gameNode.obj.physics.arcade.collide(nodes.ids[c[0]].obj, nodes.ids[c[1]].obj);
                }
                for (i = 0; i < nodes.gameNode.updateMethods.length; i++) {
                    nodes.gameNode.updateMethods[i]();
                }
            }
        };
        nodes.gameNode.obj = new Phaser.Game(width, height, mode, '', gameImpl);
    };

module.exports = init;
