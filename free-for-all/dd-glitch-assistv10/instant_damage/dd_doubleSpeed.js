// dd_double_right.js
// every mv is multiplied by 2

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
        // loop through all rows
        let row = fwd_mvs[i];
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS

            mv[0] = mv[0]*2; // this sets the horizontal motion vector to 2x
            mv[1] = mv[1]*2; // this sets the vertical motion vector to 2x
        }
    }
}
