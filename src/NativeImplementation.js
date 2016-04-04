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


var nodeManager = require('./impl/node-manager.js');
var init = require('./impl/init');
var Nodes = require('./impl/nodes');

var nodes = new Nodes();
var running = false;


module.exports = {
    components: {
        mount: function (id, tag, props, parent) {
            invariant(!(tag === 'game' && nodes.gameNode), 'Only one game node can be mounted.');
            invariant(!(tag !== 'game' && !parent), 'Only \'game\' can be root node.');
            invariant(!(props.name && nodes.idByName(props.name)), 'Cannot repeat names.');

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

            nodes.register(node);

            if (tag === 'game') {
                nodes.setGameNode(node);
            } else if (running) {
                nodeManager.mount(nodes, node);
            }

            return node;
        },
        unmount: function (node) {
            if (node.parent) {
                var parent = nodes.byId(node.parent);
                parent.children.splice(parent.children.indexOf(node.id), 1);
            }

            nodes.unregister(node);

            if (node.tag === 'game') {
                nodes.setGameNode(null);
            } else {
                nodeManager.unmount(nodes, node);
            }
        },
        update: function (node, nextProps, lastProps) {
            node.props = nextProps;
            nodes.update(node, lastProps);
            nodeManager.update(nodes, node, lastProps);
        }
    },
    transaction: {
        initialize: function () {
        },
        close: function () {
            if (nodes.gameNode && !running) {
                running = true;
                init(nodes);
            } else if (running && !nodes.gameNode) {
                running = false;
                console.log('destroy');
            }
        }
    }
};
