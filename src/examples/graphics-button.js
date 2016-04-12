var React = require('../native'),

    MyGame = React.createClass({

        render: function () {
            return (
                <game width={800} height={600}>
                    <assets>
                        <renderimage assetKey="button" frameHeight={40}>
                            <rect x={0} y={0} width={200} height={40} fill={0x0000FF}/>
                            <rect x={0} y={40} width={200} height={40} fill={0x00FF00}/>
                            <rect x={0} y={80} width={200} height={40} fill={0xFF0000}/>
                            <rect x={0} y={120} width={200} height={40} fill={0xFFFF00}/>
                        </renderimage>
                    </assets>
                    <button x={0} y={0} assetKey="button" frames={[0, 1, 2, 3]}/>
                </game>
            );
        }
    });


React.render(<MyGame/>, 'game');