var setProperties = require('./properties'),

    addChildActors = function (nodes, gameNode, children, groupNode) {
        children.forEach(function (childId) {
            var child = nodes.ids[childId];
            switch (child.tag) {
                case 'sprite':
                {
                    var {x = 0, y = 0, sprite} = child.props;
                    child.obj = groupNode ?
                        groupNode.obj.create(x, y, sprite) :
                        gameNode.obj.add.sprite(x, y, sprite);
                    setProperties(nodes, gameNode, child, child.props);
                    if (child.children.length > 0) {
                        addChildActors(nodes, gameNode, child.children, child);
                    }
                    break;
                }
                case 'group':
                    child.obj = groupNode ?
                        groupNode.obj.create() :
                        gameNode.obj.add.group();
                    setProperties(nodes, gameNode, child, child.props);
                    if (child.children.length > 0) {
                        addChildActors(nodes, gameNode, child.children, child);
                    }
                    break;
                case 'animation':
                case 'collides':
                case 'cursors':
                    setProperties(nodes, gameNode, child, child.props);
                    break;
            }
        });
    },

    create = function (gameNode, nodes) {
        var {assets = {}, width, height, mode = Phaser.AUTO} = gameNode.props;

        var gameImpl = {
            preload: function () {
                Object.keys(gameNode.props.assets).forEach(function (key) {
                    var asset = gameNode.props.assets[key];
                    switch (asset.type) {
                        case 'image':
                            gameNode.obj.load.image(key, asset.src);
                            break;
                        case 'spritesheet':
                            gameNode.obj.load.spritesheet(key, asset.src, asset.width, asset.height);
                            break;
                    }
                });
            },
            create: function () {
                if (gameNode.props.physics) {
                    gameNode.obj.physics.start(gameNode.props.physics);
                    gameNode.physics = 'arcade';
                }
                addChildActors(nodes, gameNode, gameNode.children, null);
            },
            update: function () {
                for (var i = 0; i < gameNode.collisions.length; i++) {
                    var c = gameNode.collisions[i];
                    gameNode.obj.physics.arcade.collide(nodes.ids[c[0]].obj, nodes.ids[c[1]].obj);
                }
                for (i = 0; i < gameNode.updateMethods.length; i++) {
                    gameNode.updateMethods[i]();
                }
            }
        };
        gameNode.collisions = [];
        gameNode.updateMethods = [];
        gameNode.obj = new Phaser.Game(width, height, mode, '', gameImpl);
    };

module.exports = {
    create: create
};
