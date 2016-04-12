'use strict';

var loadAssets = function (nodeManager, nodes) {
    var gameNode = nodes.gameNode,
        assets = gameNode.props.assets;

    if (assets) {
        Object.keys(assets).forEach(function (key) {
            var asset = assets[key];
            switch (asset.type) {
                case 'image':
                    gameNode.obj.load.image(key, asset.src);
                    break;
                case 'spritesheet':
                    gameNode.obj.load.spritesheet(key, asset.src, asset.width, asset.height);
                    break;
            }
        });
    }

    var assetsIds = gameNode.children.filter(function (nodeId) {
        return nodes.byId(nodeId).tag === 'assets';
    });

    nodeManager.initChildren(nodes, assetsIds);

};

module.exports = loadAssets;
