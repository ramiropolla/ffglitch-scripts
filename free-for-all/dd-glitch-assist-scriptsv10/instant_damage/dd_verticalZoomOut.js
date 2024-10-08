// dd_vertical_zoom_out.js

var zspeed = 15;

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

    // clear horizontal element of all motion vectors
    let MID_POINT = fwd_mvs.length/2;
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {
        let row = fwd_mvs[i];

        // loop through all rows

        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];

            // THIS IS WHERE THE MAGIC HAPPENS
            // HORIZONTAL 'ZOOM'
            if(i > MID_POINT){
                mv[0] = 0;
                mv[1] = mv[1]+zspeed;
            }else{
                mv[0] = 0;
                mv[1] = mv[1]-zspeed;
            }

        }
    }
}
