'use strict';


var extend = require('extend');

module.exports = extend(
    {},
    require('./PIXI.Sprite'),
    require('./Phaser.Component.Core'),
    require('./Phaser.Component.Angle'),
    require('./Phaser.Component.Animation'),
    require('./Phaser.Component.AutoCull'),
    require('./Phaser.Component.Bounds'),
    require('./Phaser.Component.BringToTop'),
    require('./Phaser.Component.Crop'),
    require('./Phaser.Component.Delta'),
    require('./Phaser.Component.Destroy'),
    require('./Phaser.Component.FixedToCamera'),
    require('./Phaser.Component.InputEnabled'),
    require('./Phaser.Component.LifeSpan'),
    require('./Phaser.Component.LoadTexture'),
    require('./Phaser.Component.Overlap'),
    require('./Phaser.Component.Reset'),
    require('./Phaser.Component.Smoothed')
);

