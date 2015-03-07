module.exports = function () {
	var hg = require('mercury'),
		h = hg.h,
		resolution = { x: 800, y: 600 },
		config = {
			maxHealth: 150,
			maxEnemies: 20,
			deafultPlayer: {
				health: 100,
				x: 150,
				y: 200
			},
			defaultEnemy: {
				x: Math.random() * resolution.x,
				y: Math.random() * resolution.y
			}
		};

	function App() {
		var state = hg.struct({
			gameState: hg.value('menu'),
			player: hg.value(config.defaultPlayer),
			lives: hg.value(3),
			enemies: hg.value([])
		});

		hg.watch(state.player, function (player) {
			if (player) {
				if (player.health <= 0) {
					alert('You died!');
				}
				else if (player.health > config.maxHealth) {
					state.player.health = config.maxHealth;
				}
			}
		});

		events.spawnEnemy(state.enemies());
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
					'ev-click': hg.event(events.gameStart)
				}, 'Start'));
		}
	},
	events = {
		gameStart: function (state) {
			console.log(state);
			
		},
		spawnPlayer: function (state) {
			state.player.set(config.defaultPlayer);
		},
		spawnEnemy: function (state) {
			state.push(config.defaultEnemy);
			console.log(state);
		}
	};

	return App;
}
