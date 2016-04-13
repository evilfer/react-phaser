var React = require('../native'),

    assets = {
        'sky': {type: 'image', src: '../assets/sky.png'},
        'ground': {type: 'image', src: '../assets/platform.png'},
        'star': {type: 'image', src: '../assets/star.png'},
        'dude': {type: 'spritesheet', src: '../assets/dude.png', width: 32, height: 48}
    };

React.render((
    <game assets={assets} width={800} height={600} physics={Phaser.Physics.ARCADE}>
        <sprite assetKey="sky"/>
        <sprite x={0} y={0} assetKey="star"/>
        <group name="platforms" enableBody={true}>
            <sprite name="ground" assetKey="ground" y={600 - 64} scale={{x: 2, y:2}} bodyImmovable={true}/>
            <sprite name="ledge1" assetKey="ground" x={400} y={400} bodyImmovable={true}/>
            <sprite name="ledge2" assetKey="ground" x={-150} y={250} bodyImmovable={true}/>
        </group>
        <sprite name="player" x={32} y={450} assetKey="dude" bodyPhysics={true} bodyBounceY={0.2} bodyGravityY={300}>
            <animation id="left" frames={[0, 1, 2, 3]} fps={10} loop={true}/>
            <animation id="right" frames={[5, 6, 7, 8]} fps={10} loop={true}/>
            <collides with="platforms"/>
        </sprite>
    </game>
), 'game');