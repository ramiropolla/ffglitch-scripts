// global variable holding forward motion vectors from previous frames
let prev_fwd_mvs = [ ];

// change this value to use a smaller or greater number of frames to
// perform the average of motion vectors
let tail_length = 10;

export function setup(args)
{
    // select motion vector feature
    args.features = [ "mv" ];
}

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
    // bail out if we have no forward motion vectors
    const fwd_mvs = frame.mv?.forward;
    if ( !fwd_mvs )
        return;

    // update variable holding forward motion vectors from previous
    // frames. note that we perform a deep copy of the clean motion
    // vector values before modifying them.
    const json_str = JSON.stringify(fwd_mvs);
    const deep_copy = JSON.parse(json_str);
    // push to the end of array
    prev_fwd_mvs.push(deep_copy);
    // drop values from earliest frames to always keep the same tail
    // length
    if ( prev_fwd_mvs.length > tail_length )
        prev_fwd_mvs = prev_fwd_mvs.slice(1);

    // bail out if we still don't have enough frames
    if ( prev_fwd_mvs.length != tail_length )
        return;

    // replace all motion vectors of current frame with an average
    // of the motion vectors from the previous 10 frames
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {
        // loop through all rows
        const row = fwd_mvs[i];
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            const mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS

            mv[0] = average_mv(mv, i, j, tail_length, 0);
            mv[1] = average_mv(mv, i, j, tail_length, 1);
        }
    }
}
