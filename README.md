# React-phaser

A React-based wrapper for phaser.

React-phaser allows game developers to create a Phaser game through React nodes. Main features:

- Phaser objects are represented as React VDOM nodes; react-phaser reacts to VDOM changes by adding, updating or removing Phaser objects.
- React-phaser users a React version unhooked from browser DOM manipulation.

See the [example code](https://github.com/evilfer/react-phaser/tree/master/src/examples) to see an implementation of the Phaser [Making your first game tutorial](http://phaser.io/tutorials/making-your-first-phaser-game).

## Getting started

Install with:
```bash
npm install react-phaser
```

In your code:

```javascript
var React = require('react-phaser'),

    MyGame = React.createClass({
    	render: function () {
			return <game/>;
		}
    });

React.render(<MyGame/>, 'game');
```

- `require('react-phaser')` provides the same object as `require('react')`; however, when react-phaser is loaded it modifies React to remove the DOM manipulation functionality, and inject the Phaser wrapper.
- `React.render` is a method added by react-phaser. that initializes the React lifecycle for the element passes as first parameter. The second parameter (a string) identifies the virtual container where the game is rendered. This is not a DOM element, but rather a react-phaser internal unique string.
- `<game>` is one of the tags that react-phaser makes available (see [list of available tags](https://github.com/evilfer/react-phaser/wiki/Tags)).



## Further reading

- [react-phaser wiki](https://github.com/evilfer/react-phaser/wiki)