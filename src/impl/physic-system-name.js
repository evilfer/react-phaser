'use strict';

var names = {};

names[Phaser.Physics.ARCADE] = 'arcade';
names[Phaser.Physics.BOX2D] = 'box2d';
names[Phaser.Physics.CHIPMUNK] = 'chipmunk';
names[Phaser.Physics.MATTERJS] = 'matter';
names[Phaser.Physics.NINJA] = 'ninja';
names[Phaser.Physics.P2JS] = 'p2';

module.exports = function (system) {
    return names[system] || 'arcade';
};
