// dd_gravity.js

// global variable holding forward motion vectors from previous frames
var old_mvs = [ ];
// a variable for gravity
var rt = 0;
var gravity = 10;

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

	// buffer first set of vectors. . .
	if(rt == 0){
		let json_str = JSON.stringify(fwd_mvs);
		let deep_copy = JSON.parse(json_str);
		// push to the end of array
		old_mvs.push(deep_copy);
		rt = 1;
	}

    // columns
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {

        let row = fwd_mvs[i];
        let old_row = old_mvs[0][i];

        // rows
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];
			let omv = old_row[j];

            // THIS IS WHERE THE MAGIC HAPPENS
            mv[0] = mv[0];
            if(mv[1] > 0){
        	    var nmv = mv[1];
        	    mv[1] = omv[1];
        	    omv[1] = nmv + omv[1] - gravity;
			}else{
				mv[1] = mv[1];
			}
        }
    }
}
