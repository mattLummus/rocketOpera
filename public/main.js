(function () {
	var app = require('./js/app')(),
		atom = app(),
		hg = require('mercury'),
		h = hg.h;

		hg.app(document.body, atom, app.render);
})();
