var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	nodemon = require('nodemon');

gulp.task('default', function () {
	nodeServer();
	bundleJS();

	function bundleJS() {
		var b = browserify({
			cache: {},
			packageCache: {},
			fullPaths: true
		});
		b = watchify(b);
		b.on('update', function(){
			bundleShare(b);
		});
		b.add('./public/main.js');
		bundleShare(b);

		function bundleShare(b) {
			b.bundle()
			.pipe(source('main.js'))
			.pipe(gulp.dest('./public/dist'));
		}
	}

	function nodeServer() {
		nodemon({
			script: 'server.js',
			ext: 'js json'
		});

		nodemon.on('restart', function (files) {
			console.log('');
			console.log('App restarted due to:');
			files.forEach(function (file) {
				var dir = process.cwd();
				output = file.replace(dir + '/', '--');
				console.log(output);
			});
		});
	}
});
