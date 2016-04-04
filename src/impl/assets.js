'use strict';

var loadAssets = function (gameNode, assets) {
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
};

module.exports = loadAssets;
