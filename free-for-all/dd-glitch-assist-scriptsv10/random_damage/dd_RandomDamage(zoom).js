// dd_RandomDamage(zoom).js
// shear x and y components of mv if threshold met for frame

let threshold = 95;

var ZOOM = 100;

export function setup(args)
{
    args.features = [ "mv" ];
}

export function glitch_frame(frame)
{
    var do_or_not = Math.random() * 100;
    // only do the glitch if our random number crosses the threshold
    if(do_or_not > threshold){
        var do_dir = Math.random() * 100;
        if(do_dir > 50){
            ZOOM = 0 - ZOOM;
        }
        // bail out if we have no forward motion vectors
        const fwd_mvs = frame.mv?.forward;
        if ( !fwd_mvs )
            return;

        // set motion vector overflow behaviour in ffedit to "truncate"
        frame.mv.overflow = "truncate";

        const M_H = fwd_mvs.height / 2;
        const M_W = fwd_mvs.width  / 2;

        // clear horizontal element of all motion vectors
        for ( let i = 0; i < fwd_mvs.length; i++ )
        {
            // loop through all rows
            let row = fwd_mvs[i];
            for ( let j = 0; j < row.length; j++ )
            {
                // loop through all macroblocks
                let mv = row[j];
                mv[0] = mv[0] + ((M_W - j) / 10)*ZOOM;
                mv[1] = mv[1] + ((M_H - i) / 10)*ZOOM;
            }
        }
    }
}
