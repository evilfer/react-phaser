/**
 * Copyright 2016-present, Eloy Villasclaras
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

var create = function (impl) {
    var tree = {
            root: null,
            nodes: {},
            byname: {}
        },
        treeImpl = {
            components: {
                mount: function (id, tag, props, parent) {
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
                    } else {
                        tree.root = node;
                    }
                    tree.nodes[id] = node;

                    if (props.name) {
                        tree.byname[props.name] = node;
                    }

                    impl.components.mount(node, tree);
                    return node;
                },
                childrenMount: function (node) {
                    impl.components.childrenMount(node, tree);
                },
                unmount: function (node) {
                    impl.components.unmount(node, tree);
                    delete tree.nodes[node.id];
                    if (node.parent) {
                        var parent = tree.nodes[node.parent];
                        parent.children.splice(parent.children.indexOf(node.id), 1);
                    }
                    delete tree.nodes[node.id];
                    if (node === tree.root) {
                        tree.root = null;
                    }

                    if (node.props.name) {
                        delete tree.byname[node.props.name];
                    }
                },
                update: function (node, nextProps, prevProps) {
                    node.props = nextProps;
                    impl.components.update(node, prevProps, tree);
                    if (nextProps.name !== prevProps.name) {
                        if (prevProps.name) {
                            delete tree.byname[prevProps.name];
                        }
                        if (nextProps.name) {
                            tree.byname[nextProps.name] = node;
                        }
                    }
                }
            },
            transaction: {
                initialize: impl.transaction.initialize && function () {
                    impl.transaction.initialize(tree);
                },
                close: impl.transaction.close && function () {
                    impl.transaction.close(tree);
                }
            }
        };

    return treeImpl;
};

module.exports = create;
