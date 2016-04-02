/**
 * Copyright 2016-present, Eloy Villasclaras
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

var invariant = require('invariant');

var gameImpl = require('./impl/game');

var nodes = {
    ids: {},
    name2id: {},
    id2name: {}
};

var running = false;
var gameNode;
var game;


module.exports = {
    components: {
        mount: function (id, tag, props, parent) {
            invariant(!(tag === 'game' && gameNode), 'Only one game node can be mounted.');
            invariant(!(tag !== 'game' && !parent), 'Only \'game\' can be root node.');
            invariant(!(props.name && nodes.name2id.hasOwnProperty(props.name)), 'Cannot repeat names.');

            var node = {
                id: id,
                tag: tag,
                props: props,
                parent: parent && parent.id,
                children: []
            };
            if (parent) {
                parent.children.push(id);
            }

            nodes.ids[id] = node;
            if (props.name) {
                nodes.name2id[props.name] = id;
                nodes.id2name[id] = props.name;
            }

            if (tag === 'game') {
                gameNode = node;
            }
            return node;
        },
        childrenMount: function (node, children) {
        },
        unmount: function (node) {
            if (node.parent) {
                var parent = nodes.ids[node.parent];
                parent.children.splice(parent.children.indexOf(node.id), 1);
            }

            delete nodes.ids[node.id];
            if (node.props.name) {
                delete nodes.name2id[node.props.name];
                delete nodes.id2name[node.id];
            }

            if (node.tag === 'game') {
                gameNode = null;
            }
        },
        update: function (node, nextProps, lastProps) {
            if (lastProps.name && lastProps.name !== nextProps.name) {
                delete nodes.name2id[node.props.name];
                delete nodes.id2name[node.id];
            }
            if (nextProps.name && lastProps.name !== nextProps.name) {
                nodes.name2id[nextProps.name] = node.id;
                nodes.id2name[node.id] = nextProps.name;
            }
        }
    },
    transaction: {
        initialize: function () {
        },
        close: function () {
            if (gameNode && !running) {
                game = gameImpl.create(gameNode, nodes);

            } else if (running && !gameNode) {
                console.log('destroy');
            }
        }
    }
};
