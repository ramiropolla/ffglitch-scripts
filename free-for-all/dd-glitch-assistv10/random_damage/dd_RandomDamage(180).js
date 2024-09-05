// dd_RandomDamage(180).js
// randomly rotate by 180 x and y components of mv if threshold met for frame

// clean buffer :
var buffer = [ ];

let threshold = 95;
var ZOOM = 100;

export function glitch_frame(frame)
{
	var do_or_not = Math.random() * 100;
	// only do the glitch if our random number crosses the threshold
	if(do_or_not > threshold){
		ZOOM = Math.random() * 100;
		var do_dir = Math.random() * 100;
		if(do_dir > 50){
			ZOOM = 0 - ZOOM;
		}
		// bail out if we have no motion vectors
		let mvs = frame["mv"];
		if ( !mvs )
			return;
		// bail out if we have no forward motion vectors
		let fwd_mvs = mvs["forward"];
		if ( !fwd_mvs )
			return;

		// note that we perform a deep copy of the clean motion
	    // vector values before modifying them.
	    let json_str = JSON.stringify(fwd_mvs);
	    let deep_copy = JSON.parse(json_str);
		// stick em in the buffer
    	buffer = deep_copy;

		var M_H = fwd_mvs.length/2;
		// clear horizontal element of all motion vectors
		for ( let i = 0; i < fwd_mvs.length; i++ )
		{
			// loop through all rows
			let row = fwd_mvs[i];
			var row2 = buffer[(fwd_mvs.length-1)-i];

			var M_W = row.length/2;

			for ( let j = 0; j < row.length; j++ )
			{
				// loop through all macroblocks
				let mv = row[j];
				var mv2 = row2[(row.length - 1) - j];
				// THIS IS WHERE THE MAGIC HAPPENS
				// FLIP X, FLIP Y, MIRROR = 180 X & Y VECTORS
				mv[0] = 0-mv2[0];
            	mv[1] = 0-mv2[1];

			}
		}
	}
}
