// dd_RandomDamage(stopXYSmash).js
// stop x and y component of mv for n frames if threshold met for frame
// then SMASH.

let threshold = 98;
var TRIGGERED = 0;
var nFrames = 10;
var MAXFRAMES = 10;
var frameCount = 0;
var MAGNITUDE = 100;
export function glitch_frame(frame)
{

	var do_or_not = Math.random() * 100;
	if(do_or_not > threshold){
		if(TRIGGERED > 0){

		}else{
			TRIGGERED = 1;
			nFrames = Math.round((MAXFRAMES * 0.5) + (Math.random() * MAXFRAMES * 0.5));
			frameCount = 0;
		}
	}
	// only do the glitch if our random number crosses the threshold
	if(TRIGGERED > 0 & frameCount <= nFrames){

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
				// STOP XY unless final frame, in which case randomise everything
				if(frameCount == nFrames){
					mv[0] = MAGNITUDE * mv[0];// * (Math.random() * MAGNITUDE);
					mv[1] = MAGNITUDE * mv[1];// * (Math.random() * MAGNITUDE);
				}else{
					mv[0] = 0;
					mv[1] = 0;
				}
			}
		}
		frameCount++;
	}else{
		TRIGGERED = 0;
	}
}
