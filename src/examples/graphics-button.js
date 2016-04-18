var React = require('../native'),

    buttonShape = {
        width: 200,
        height: 40,
        radius: 5
    },

    MyGame = React.createClass({

        render: function () {
            return (
                <game width={800} height={600}>
                    <assets>
                        <renderimage assetKey="button" frameHeight={40}>
                            <roundedrect x={0} y={0} {...buttonShape} fill={0x0000FF}/>
                            <roundedrect x={0} y={40} {...buttonShape} fill={0x00FF00}/>
                            <roundedrect x={0} y={80} {...buttonShape} fill={0xFF0000}/>
                            <roundedrect x={0} y={120} {...buttonShape} fill={0xFFFF00}/>
                        </renderimage>
                    </assets>
                    <button x={0} y={0} assetKey="button" frames={[0, 1, 2, 3]}>
                        <text align="center middle" text="hi!"/>
                    </button>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');