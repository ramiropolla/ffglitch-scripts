//import('./my_include.js');
//var n = return_zero();
//import {return_zero} from './my_include.js';
//'loadScript('./my_include.js');

// dd_swap.js
// swaps x and y components of mv

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
			// SWAP X & Y VECTORS
			//let t = mv[0]
            //mv[0] = mv[1];
            //mv[1] = t;
            //mv = dd_swap(mv);
            //mv[0] = return_zero();

        }
    }
}
