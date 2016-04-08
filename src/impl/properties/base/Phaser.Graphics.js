'use strict';

var extend = require('extend');

module.exports = extend(
    {},
    require('./PIXI.Graphics'),
    require('./Phaser.Component.Core'),
    require('./Phaser.Component.Angle'),
    require('./Phaser.Component.AutoCull'),
    require('./Phaser.Component.Bounds'),
    require('./Phaser.Component.Destroy'),
    require('./Phaser.Component.FixedToCamera'),
    require('./Phaser.Component.InputEnabled'),
    require('./Phaser.Component.InWorld'),
    require('./Phaser.Component.LifeSpan'),
    require('./Phaser.Component.PhysicsBody'),
    require('./Phaser.Component.Reset')
);

