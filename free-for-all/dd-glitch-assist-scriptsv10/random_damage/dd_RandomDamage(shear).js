// dd_RandomDamage(shear).js
// shear x and y components of mv if threshold met for frame

let threshold = 95;

var ZOOM = 50;

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

        fwd_mvs.forEach((mv, i, j) => {
            mv[0] += ((i - M_W) / 100) * ZOOM;
            mv[1] += ((j - M_H) / 100) * ZOOM;
        });
    }
}
