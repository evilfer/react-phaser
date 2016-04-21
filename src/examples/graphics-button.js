var React = require('../native'),

    buttonShape = {
        width: 200,
        height: 40,
        radius: 5
    },

    MyGame = React.createClass({

        render: function () {
            return (
                <game width={800} height={600} stageBackgroundColor={0xEEEEEE}>
                    <assets>
                        <renderimage assetKey="button" frameHeight={40}>
                            <roundedrect x={0} y={0} {...buttonShape} fill={0x0000FF}/>
                            <roundedrect x={0} y={40} {...buttonShape} fill={0x00FF00}/>
                            <roundedrect x={0} y={80} {...buttonShape} fill={0xFF0000}/>
                            <roundedrect x={0} y={120} {...buttonShape} fill={0xFFFF00}/>
                        </renderimage>
                        <renderimage assetKey="button2" frameHeight={40}>
                            <roundedrect x={0} y={0} {...buttonShape} fill={0x0000FF}/>
                            <texturetext x={100} y={20} style={{fill: '#ddd'}}
                                         align="center middle" text="hi!"/>

                            <roundedrect x={0} y={40} {...buttonShape} fill={0x00FF00}/>
                            <texturetext x={100} y={60} style={{fill: '#fff'}}
                                         align="center middle" text="hi!"/>

                            <roundedrect x={0} y={80} {...buttonShape} fill={0xFF0000}/>
                            <texturetext x={100} y={100} style={{fill: '#eee'}}
                                         align="center middle" text="hi!"/>

                            <roundedrect x={0} y={120} {...buttonShape} fill={0xFFFF00}/>
                            <texturetext x={100} y={140} style={{fill: '#000'}}
                                         align="center middle" text="hi!"/>
                        </renderimage>
                    </assets>
                    <button x={10} y={10} assetKey="button" frames={[0, 1, 2, 3]}>
                        <text align="center middle" text="hi!"/>
                    </button>
                    <button x={10} y={100} assetKey="button2" frames={[0, 1, 2, 3]}/>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');