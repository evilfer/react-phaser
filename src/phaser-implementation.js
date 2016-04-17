/**
 * Copyright 2016-present, Eloy Villasclaras
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

var createTreeImpl = require('./node-management/node-tree-adapter'),
    createInitAdapter = require('./node-management/node-init-adapter'),
    nodeTypes = require('./impl/types');

module.exports = createTreeImpl(createInitAdapter(nodeTypes));
