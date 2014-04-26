
/**
 * connect constructor.
 * @api public
 */


module.exports = function connect(slave, node) {
	return function(ctx) {

		ctx.on('candidate', function(candidate) {
			slave.ice(candidate);
		});

		slave.on('candidate', function(candidate) {
			ctx.ice(candidate);
		});

		slave.on('answer', function(offer) {
			ctx.remote(offer);
		});

		ctx.on('offer', function(offer) {
			slave.remote(offer);
			slave.answer();
		});

		slave.on('remote stream', function(stream) {
			//NOTE: refactor attach
			document.querySelector('#slave').src = window.URL.createObjectURL(stream);
		});

		ctx.on('local stream', function() {
			ctx.offer();
		});
	};
};
