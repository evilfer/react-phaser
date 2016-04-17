var React = require('../native'),

    textStyle = {
        fontSize: '12px',
        fill: '#fff'
    },

    MyGame = React.createClass({
        getInitialState: function () {
            return {
                name: "stateA"
            };
        },

        startState: function (stateName) {
            this.setState({name: stateName});
        },

        render: function () {
            return (
                <game width={800} height={600} stateName={this.state.name}>
                    <state name="stateA">
                        <input>
                            <key keyCode={Phaser.KeyCode.A} keyName="a"
                                 onDown={this.startState.bind(this, "stateB")}/>
                        </input>
                        <text text="State A. Press 'a' to move on." style={textStyle} x={16} y={16}/>
                    </state>
                    <state name="stateB">
                        <input>
                            <key keyCode={Phaser.KeyCode.B} keyName="b"
                                 onDown={this.startState.bind(this, "stateA")}/>
                        </input>
                        <text text="State B. Press 'b' to move on." style={textStyle} x={16} y={16}/>
                    </state>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');