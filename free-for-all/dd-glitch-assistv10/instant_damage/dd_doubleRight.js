// dd_double_right.js
// every mv on the right of the frame is multiplied by 2

export function glitch_frame(frame)
{
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
		let row = fwd_mvs[i];
		let MID_POINT = row.length/2;
        // loop through all rows

        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS
			// DOUBLESPEED THE RIGHT HAND SIDE OF THE FRAME
			if(j > MID_POINT){
					mv[0] = mv[0] * 2;
					mv[1] = mv[1] * 2;
			}else{
				//			mv[0] = mv[0]+15;
				//			mv[1] = 0;
			}
        }
    }
}
