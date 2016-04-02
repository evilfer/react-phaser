var defaultPropValues = {
        scale: [1, 1],
        enableBody: false,
        bodyImmovable: false,
        physics: false,
        bounceY: 0,
        gravityY: 0,
        collideWorldBounds: false,
        frames: [],
        loop: false
    },


    setProperties = function (nodes, gameNode, node, nextProps, prevProps = null) {
        var useProps = Object.keys(nextProps);
        if (prevProps) {
            useProps = useProps.filter(function (key) {
                return !(key in prevProps) || nextProps[key] !== prevProps[key];
            });
            Object.keys(prevProps).forEach(key => {
                if (!(key in nextProps)) {
                    useProps.push(key);
                }
            });
        }


        switch (node.tag) {
            case 'animation':
                return setAnimationProperties(nodes, gameNode, node, useProps, nextProps, prevProps);
            case 'collides':
                return setCollidesProperties(nodes, gameNode, node, useProps, nextProps);
            case 'cursors':
                return setCursorsProperties(nodes, gameNode, node, useProps, nextProps);
            default:
                return setActorProperties(gameNode, node, useProps, nextProps);
        }
    },

    setActorProperties = function (gameNode, node, useProps, nextProps) {
        useProps.forEach(function (key) {
            var value = nextProps[key] !== undefined ? nextProps[key] : defaultPropValues[key];
            switch (key) {
                case 'scale':
                    node.obj.scale.setTo(value[0], value[1]);
                    break;
                case 'bodyImmovable':
                    node.obj.body.immovable = value;
                    break;
                case 'enableBody':
                    node.obj.enableBody = value;
                    break;
                case 'physics':
                    if (value) {
                        gameNode.obj.physics.arcade.enable(node.obj);
                    } else {
                        gameNode.obj.physics.arcade.disable(node.obj);
                        /* ?? */
                    }
                    break;
                case 'bounceY':
                    node.obj.body.bounce.y = value;
                    break;
                case 'gravityY':
                    node.obj.body.gravity.y = value;
                    break;
                case 'collideWorldBounds':
                    node.obj.body.collideWorldBounds = value;
                    break;
            }
        });
    },

    setCollidesProperties = function (nodes, gameNode, node, useProps, nextProps) {
        if (useProps[0] === 'with') {
            var collidesWithId = nodes.name2id[nextProps.with];
            node.obj = [node.parent, collidesWithId];
            gameNode.collisions.push(node.obj);
        }
    },
    setCursorsProperties = function (nodes, gameNode, node, useProps, nextProps) {
        if (useProps[0] === 'onInput') {
            var onInput = nextProps.onInput,
                cursors = gameNode.obj.input.keyboard.createCursorKeys(),
                getActor = function (name) {
                    return nodes.ids[nodes.name2id[name]].obj;
                };

            node.obj = {
                cursors: cursors,
                callback: function () {
                    onInput(cursors, getActor)
                }
            };

            gameNode.updateMethods.push(node.obj.callback);
        }
    },
    setAnimationProperties = function (nodes, gameNode, node, useProps, nextProps, prevProps) {
        if (prevProps === null) {
            var parentNode = nodes.ids[node.parent];
            node.obj = parentNode.obj.animations.add(nextProps.id, nextProps.frames, nextProps.fps, nextProps.loop);
        }
    };


module.exports = setProperties;
