/**
 * Copyright 2016-present, Eloy Villasclaras
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

var create = function (nodeTypes) {

        var transactionListeners = [],

            parentInitd = function (node, tree) {
                var parent = tree.nodes[node.parent];
                return !parent || parent.initialized;
            },

            invoke = function (method, node, a, b, c) {
                var nodeType = nodeTypes[node.tag],
                    f = nodeType && nodeType[method];

                if (f) {
                    f(node, a, b, c);
                }
            },

            initImmediately = function (node) {
                var nodeType = nodeTypes[node.tag];
                return !nodeType || !nodeTypes[node.tag].deferredInit;
            },

            init = function (method, node, tree) {
                node.initialized = true;
                invoke(method, node, tree, methods);
                if (node.obj) {
                    node.obj.rnodeid = node.id;
                }
            },

            initChildren = function (parent, tree, options) {
                var _options = options || {},
                    include = _options.include,
                    exclude = _options.exclude;

                for (var i = 0; i < parent.children.length; i++) {
                    var child = tree.nodes[parent.children[i]],
                        doInit = !child.initialized &&
                            (!include || include.indexOf(child.tag) >= 0) &&
                            (!exclude || exclude.indexOf(child.tag) < 0);

                    if (doInit) {
                        if (initImmediately(child)) {
                            init('init', child, tree);
                            methods.initChildren(child, tree);
                            invoke('onChildrenInit', child, tree, methods);
                        } else {
                            init('onChildrenInit', child, tree, methods);
                        }
                    }
                }
            },

            clearChildren = function (parent, tree, options) {
                var _options = options || {},
                    include = _options.include,
                    exclude = _options.exclude;

                for (var i = 0; i < parent.children.length; i++) {
                    var child = tree.nodes[parent.children[i]],
                        shouldClear = child.initialized &&
                            (!include || include.indexOf(child.tag) >= 0) &&
                            (!exclude || exclude.indexOf(child.tag) < 0);

                    if (shouldClear) {
                        invoke('clear', tree, methods);
                        child.initialized = false;
                        if (child.children.length > 0) {
                            clearChildren(child, tree);
                        }
                    }
                }
            },

            requestTransactionNofitication = function (nodeid) {
                if (transactionListeners.indexOf(nodeid) < 0) {
                    transactionListeners.push(nodeid);
                }
            },

            cancelTransactionNofitication = function (nodeid) {
                var index = transactionListeners.indexOf(nodeid);
                if (index >= 0) {
                    transactionListeners.splice(index, 1);
                }
            },

            methods = {
                initChildren: initChildren,
                clearChildren: clearChildren,
                requestTransactionNofitication: requestTransactionNofitication,
                cancelTransactionNofitication: cancelTransactionNofitication
            },

            impl = {
                components: {
                    mount: function (node, tree) {
                        if (initImmediately(node) && parentInitd(node, tree)) {
                            init('init', node, tree);
                        }
                    },
                    childrenMount: function (node, tree) {
                        if (node.initialized) {
                            invoke('onChildrenInit', node, tree, methods);
                        } else if (parentInitd(node, tree)) {
                            init('onChildrenInit', node, tree, methods);
                        }
                    },
                    unmount: function (node, tree) {
                        invoke('kill', node, tree);
                    },
                    update: function (node, prevProps, tree) {
                        invoke('update', node, prevProps, tree, methods);
                    }
                },
                transaction: {
                    close: function (tree) {
                        if (transactionListeners.length > 0) {
                            for (var i = 0; i < transactionListeners.length; i++) {
                                var node = tree.nodes[transactionListeners[i]];
                                if (node) {
                                    invoke('notifyTransaction', node, tree);
                                }
                            }
                            transactionListeners = [];
                        }
                    }
                }
            };

        return impl;
    }
    ;

module.exports = create;
