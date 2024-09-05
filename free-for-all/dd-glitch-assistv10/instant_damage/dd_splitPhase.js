// dd_split_phase.js
// alternates between blocking horizontal or veritcal elements of mv
// switch happens every (phase) frames

let phase = 1;
let count = 0;
let frames_per_phase = 5;
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
            if(phase == 1){
				mv[0] = 0;
			}else{
            	mv[1] = 0;
			}
        }
    }
    if(count++ >= frames_per_phase){
		phase = phase * -1;
		count = 0;
	}
}
