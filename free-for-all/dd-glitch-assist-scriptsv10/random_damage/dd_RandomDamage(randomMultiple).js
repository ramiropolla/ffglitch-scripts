// dd_RandomDamage(randomMultiple).js
// radom multiplies x and y components of mv if threshold met for frame

let threshold = 95;
let multiplier = 10;

export function glitch_frame(frame)
{
	var do_or_not = Math.random() * 100;
	// only do the glitch if our random number crosses the threshold
	if(do_or_not > threshold){
		// bail out if we have no motion vectors
		let mvs = frame["mv"];
		if ( !mvs )
			return;
		// bail out if we have no forward motion vectors
		let fwd_mvs = mvs["forward"];
		if ( !fwd_mvs )
			return;

		// clear horizontal element of all motion vectors
		for ( let i = 0; i < fwd_mvs.length; i++ )
		{
			// loop through all rows
			let row = fwd_mvs[i];
			for ( let j = 0; j < row.length; j++ )
			{
				// loop through all macroblocks
				let mv = row[j];

				// THIS IS WHERE THE MAGIC HAPPENS
				// RANDOMISE X & Y VECTORS

				mv[0] = mv[0] * (Math.random() * multiplier);
				mv[1] = mv[1] * (Math.random() * multiplier);

			}
		}
	}
}
