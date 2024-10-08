// dd_slam_zoom_out.js

var ZOOM = -20;

export function setup(args)
{
    args.features = [ "mv" ];
}

export function glitch_frame(frame)
{
    // bail out if we have no forward motion vectors
    const fwd_mvs = frame.mv?.forward;
    if ( !fwd_mvs )
        return;

    // set motion vector overflow behaviour in ffedit to "truncate"
    frame.mv.overflow = "truncate";

    var M_H = fwd_mvs.length/2;
    // clear horizontal element of all motion vectors
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {

        // loop through all rows

        let row = fwd_mvs[i];
        var M_W = row.length/2;
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS
            mv[0] = ((M_W - j) / 100)*ZOOM;
            mv[1] = ((M_H - i) / 100)*ZOOM;
        }
    }
}
