// dd_RandomDamage(randomX).js
// randomise x component of mv if threshold met for frame

let threshold = 95;

var DISPLACE = 0;
var DISPLACE2 = 0;
var MAGNITUDE = 200;

export function glitch_frame(frame)
{
	var do_or_not = Math.random() * 100;
	// only do the glitch if our random number crosses the threshold
	if(do_or_not > threshold){
		DISPLACE = Math.random() * MAGNITUDE;
		DISPLACE2 = Math.random() * MAGNITUDE;
		var n_DIR = Math.random() * 100;
		if(n_DIR > 50){
			DISPLACE = 0-DISPLACE;
		}
		n_DIR = Math.random() * 100;
		if(n_DIR > 50){
			DISPLACE2 = 0-DISPLACE2;
		}
		// bail out if we have no motion vectors
		let mvs = frame["mv"];
		if ( !mvs )
			return;
		// bail out if we have no forward motion vectors
		let fwd_mvs = mvs["forward"];
		if ( !fwd_mvs )
			return;

		var M_H = fwd_mvs.length/2;
		// clear horizontal element of all motion vectors
		for ( let i = 0; i < fwd_mvs.length; i++ )
		{
			// loop through all rows
			let row = fwd_mvs[i];
			var M_W = row.length/2;

			for ( let j = 0; j < row.length; j++ )
			{
				// loop through all macroblocks
				let mv = row[j];

				// THIS IS WHERE THE MAGIC HAPPENS
				// MULTIPLY X & Y VECTORS

				//mv[0] = mv[0] + Math.random() * DISPLACE;
				mv[1] = mv[1] + Math.random() * DISPLACE2;


			}
		}
	}
}
