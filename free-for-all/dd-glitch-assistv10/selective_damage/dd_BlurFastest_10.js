// dd_blurFastest_10.js
// apply 20-frame average to the fastest moving mv's
var LARGEST = 0;
var SOME_PERCENTAGE = 0.90;

// global variable holding forward motion vectors from previous frames
var prev_fwd_mvs = [ ];

// change this value to use a smaller or greater number of frmes to average
var tail_length = 20;

// calculate average of previous motion vectors
function average_mv(mv, i, j, n, k)
{
    let sum = 0;
    for ( let t = 0; t < n; t++ )
        sum += prev_fwd_mvs[t][i][j][k];
    let val = Math.round(sum / n);
    val = Math.max(val, -64);
    val = Math.min(val,  63);
    return val;
}


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


    // update variable holding forward motion vectors from previous
    // frames. note that we perform a deep copy of the clean motion
    // vector values before modifying them.
    let json_str = JSON.stringify(fwd_mvs);
    let deep_copy = JSON.parse(json_str);
    // push to the end of array
    prev_fwd_mvs.push(deep_copy);
    // drop values from earliest frames to always keep the same tail
    // length
    if ( prev_fwd_mvs.length > tail_length )
        prev_fwd_mvs = prev_fwd_mvs.slice(1);

    // bail out if we still don't have enough frames
    if ( prev_fwd_mvs.length != tail_length )
        return;

   	// 1st loop - find the fastest mv
   	// this ends-up in LARGEST as the square of the hypotenuse (mv[0]*mv[0]) + (mv[1]*mv[1])
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
    // and then replace them with the average mv from the last n frames
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

			     	mv[0] = average_mv(mv, i, j, tail_length, 0);
            		mv[1] = average_mv(mv, i, j, tail_length, 1);
				}
	        }
    }
}
