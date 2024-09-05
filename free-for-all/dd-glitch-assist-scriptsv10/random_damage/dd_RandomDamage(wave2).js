// dd_RandomDamage(wave).js
// sin/cos x and y components of mv if threshold met for frame

let threshold = 95;
var nFrames = 5;
var TRIGGERED = 0;
var count = 0;

export function glitch_frame(frame)
{
	var do_or_not = Math.random() * 100;
	// only do the glitch if our random number crosses the threshold
	if(do_or_not > threshold | TRIGGERED == 1){
		if(TRIGGERED == 0){
			TRIGGERED = 1;
			count = 0;
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

		    //	mv[0] = Math.sin(i)*mv[0];
	  	    //	mv[1] = Math.cos(j)*mv[1];
	  	    	mv[0] = mv[0] + Math.sin(i/M_W*Math.PI*2)*mv[0];
  	    		mv[1] = mv[1] + Math.cos(j/M_H*Math.PI*2)*mv[1];

			}
		}
		count++;
		if(count >= nFrames){
			TRIGGERED = 0;
		}
	}
}
