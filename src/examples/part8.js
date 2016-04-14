var React = require('../native'),

    assets = {
        'sky': {type: 'image', src: '../assets/sky.png'},
        'ground': {type: 'image', src: '../assets/platform.png'},
        'star': {type: 'image', src: '../assets/star.png'},
        'dude': {type: 'spritesheet', src: '../assets/dude.png', width: 32, height: 48}
    },

    scoreStyle = {
        fontSize: '32px',
        fill: '#000'
    },

    MyGame = React.createClass({
        getInitialState: function () {
            return {
                stars: Array.apply(null, {length: 12}).map(function (_, i) {
                    return [i, 0.7 + Math.random() * 0.2];
                }),
                score: 0
            };
        },

        onInput: function (context) {
            var player = context.nodes.player.obj,
                cursors = context.input.cursors;

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
                }),
                score: this.state.score + 10
            });
        },

        render: function () {
            var stars = this.state.stars.map(function (star, i) {
                return <sprite key={star[0]} i={i} x={star[0] * 70} y={0} assetKey="star"
                               bodyGravityY={18} bodyBounceY={star[1]}/>
            });


            return (
                <game assets={assets} width={800} height={600} physics={Phaser.Physics.ARCADE}>
                    <sprite assetKey="sky"/>
                    <group name="platforms" enableBody={true}>
                        <sprite name="ground" assetKey="ground" y={600 - 64} scale={{x:2, y:2}} bodyImmovable={true}/>
                        <sprite name="ledge1" assetKey="ground" x={400} y={400} bodyImmovable={true}/>
                        <sprite name="ledge2" assetKey="ground" x={-150} y={250} bodyImmovable={true}/>
                    </group>
                    <group name="stars" enableBody={true}>
                        <collides with="platforms"/>
                        {stars}
                    </group>
                    <sprite name="player" x={32} y={450} assetKey="dude"
                            bodyPhysics={true} bodyBounceY={0.2} bodyGravityY={300}
                            bodyCollideWorldBounds={true}>
                        <animation id="left" frames={[0, 1, 2, 3]} fps={10} loop={true}/>
                        <animation id="right" frames={[5, 6, 7, 8]} fps={10} loop={true}/>
                        <collides with="platforms"/>
                        <overlaps with="stars" onOverlap={this.collectStar}/>
                    </sprite>
                    <text text={`Score: ${this.state.score}`} style={scoreStyle}
                          x={16} y={16}/>
                    <input cursors={true} onInput={this.onInput}/>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');