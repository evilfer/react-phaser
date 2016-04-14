/**
 * Copyright 2016-present, Eloy Villasclaras
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

var invariant = require('invariant'),
    Nodes = require('./impl/nodes'),

    nodes = new Nodes();

module.exports = {
    components: {
        mount: function (id, tag, props, parent) {
            invariant(!(tag === 'game' && nodes.gameNode), 'Only one game node can be mounted.');
            invariant(!(tag !== 'game' && !parent), 'Only \'game\' can be root node.');
            invariant(!(props.name && nodes.byName(props.name)), 'Cannot repeat names.');

            var node = {
                    id: id,
                    tag: tag,
                    props: props,
                    parent: parent && parent.id,
                    children: [],
                    initialized: false
                };

            if (parent) {
                parent.children.push(id);
            }

            nodes.mountNode(node);
            return node;
        },
        childrenMount: function (node) {
            nodes.onChildrenMount(node);
        },
        unmount: function (node) {
            if (node.parent) {
                var parent = nodes.byId(node.parent);
                parent.children.splice(parent.children.indexOf(node.id), 1);
            }

            if (node.tag === 'game') {
                nodes.setGameNode(null);
            } else {
                nodes.unmountNode(node);
            }
        },
        update: function (node, nextProps, lastProps) {
            node.props = nextProps;
            nodes.updateNode(node, lastProps);
        }
    },
    transaction: {
        initialize: function () {
        },
        close: function () {
            nodes.notifyTransaction();
        }
    }
};
