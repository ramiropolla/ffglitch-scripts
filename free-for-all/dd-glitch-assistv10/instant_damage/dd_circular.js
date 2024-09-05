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

    // columns
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {

        let row = fwd_mvs[i];

        // rows
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS
	    	mv[0] = Math.sin(i)*mv[0];
  	    	mv[1] = Math.cos(j)*mv[1];
        }
    }
}
