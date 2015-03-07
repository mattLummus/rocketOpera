module.exports = function () {
	var hg = require('mercury'),
		h = hg.h;

	function App() {
		var state = hg.struct({
			gameState: hg.value('menu')
		});

		return state;
	}

	App.render = function render(state) {
		var gameState = state.gameState,
			view = gameStates[gameState]();

		return h('.page', h('.wrapper', h('.console', [ view ])));
	};

	var gameStates = {
		menu: function () {
			return h('.menu',
				h('button.start', {
					'ev-click': hg.event(gameStart)
				}, 'Start'));
		}
	};

	function gameStart(state) {
		console.log(state);
		alert('start');
	}

	return App;
}
