
/**
 * Connect two local peer connection.
 *
 * Connect create an offer and an answer and
 * set session descriptions for each peer.
 * 
 * Examples:
 *
 *   var master = peer();
 *   var slave = peer();
 *   master.use(connect(slave));
 *   
 * @param {Peer} slave
 * @api public
 */


module.exports = function connect(slave) {

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

    ctx.create();
    slave.create();
    ctx.offer();
  };

};
