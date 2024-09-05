// dd_largestRandom.js
// only fuck things up if mv > movement_threshold
var LARGEST = 0;
var SOME_PERCENTAGE = 0.85; // only the fastest 15% of mv's in each frame get glitched

export function glitch_frame(frame)
{
	LARGEST = 0;
    // bail out if we have no motion vectors
    let mvs = frame["mv"];
    if ( !mvs )
        return;
    // bail out if we have no forward motion vectors
    let fwd_mvs = mvs["forward"];
    if ( !fwd_mvs )
        return;

   	// 1st loop - find the fastest mv
   	// this ends-up in LARGEST as the square of the hypotenuse
    let W = fwd_mvs.length;
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {
        let row = fwd_mvs[i];
        // rows
        let H = row.length;
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MEASUREMENT HAPPENS
            var this_mv = (mv[0] * mv[0])+(mv[1] * mv[1]);
            if ( this_mv > LARGEST){
				LARGEST = this_mv;
			}
        }
    }

    // then find those mv's which are bigger than SOME_PERCENTAGE of LARGEST
    // result - only the fastest moving mv get glitched
    for ( let i = 0; i < fwd_mvs.length; i++ )
	    {
	        let row = fwd_mvs[i];
	        // rows
	        let H = row.length;
	        for ( let j = 0; j < row.length; j++ )
	        {
	            // loop through all macroblocks
	            let mv = row[j];

	            // THIS IS WHERE THE MAGIC HAPPENS
	            var this_mv = (mv[0] * mv[0])+(mv[1] * mv[1]);
	            if (this_mv > (LARGEST * SOME_PERCENTAGE)){
//					var t = mv[0];
//					mv[0] = mv[1];
//					mv[1] = t;

					mv[0] = mv[0] + (( Math.random() * 100) - 50);
					mv[1] = mv[1] + (( Math.random() * 100) - 50);
					//mv[0] = 0;
				}
	        }
    }
}
