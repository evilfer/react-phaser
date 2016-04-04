var React = require('../native'),

    assets = {
        'sky': {type: 'image', src: '../assets/sky.png'},
        'ground': {type: 'image', src: '../assets/platform.png'},
        'star': {type: 'image', src: '../assets/star.png'},
        'dude': {type: 'spritesheet', src: '../assets/dude.png', width: 32, height: 48}
    },

    MyGame = React.createClass({
        getInitialState: function () {
            return {
                stars: Array.apply(null, {length: 12}).map(function (_, i) {
                    return [i, 0.7 + Math.random() * 0.2];
                })
            };
        },

        onCursorInput: function (cursors, getActor) {
            var player = getActor('player');

            if (cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 150;
                player.animations.play('right');
            } else {
                player.body.velocity.x = 0;
                player.animations.stop();
                player.frame = 4;
            }

            if (cursors.up.isDown && player.body.touching.down) {
                player.body.velocity.y = -350;
            }
        },

        collectStar: function (playerNode, starNode) {
            this.setState({
               stars: this.state.stars.filter(function (_, i) {
                   return i !== starNode.props.i;
               })
            });
        },

        render: function () {
            var stars = this.state.stars.map(function (star, i) {
                return <sprite key={star[0]} i={i} x={star[0] * 70} y={0} sprite="star"
                               gravityY={18} bounceY={star[1]}/>
            });


            return (
                <game assets={assets} width={800} height={600} physics={Phaser.Physics.ARCADE}>
                    <sprite sprite="sky"/>
                    <group name="platforms" enableBody={true}>
                        <sprite name="ground" sprite="ground" y={600 - 64} scale={[2, 2]} bodyImmovable={true}/>
                        <sprite name="ledge1" sprite="ground" x={400} y={400} bodyImmovable={true}/>
                        <sprite name="ledge2" sprite="ground" x={-150} y={250} bodyImmovable={true}/>
                    </group>
                    <group name="stars" enableBody={true}>
                        <collides with="platforms"/>
                        {stars}
                    </group>
                    <sprite name="player" x={32} y={450} sprite="dude"
                            physics={true} bounceY={0.2} gravityY={300}
                            collideWorldBounds={true}>
                        <animation id="left" frames={[0, 1, 2, 3]} fps={10} loop={true}/>
                        <animation id="right" frames={[5, 6, 7, 8]} fps={10} loop={true}/>
                        <collides with="platforms"/>
                        <overlaps with="stars" onOverlap={this.collectStar}/>
                    </sprite>
                    <cursors onInput={this.onCursorInput}/>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');