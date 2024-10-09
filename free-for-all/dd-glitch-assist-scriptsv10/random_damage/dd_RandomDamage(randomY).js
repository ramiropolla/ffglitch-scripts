// dd_RandomDamage(randomX).js
// randomise x component of mv if threshold met for frame

let threshold = 95;

var DISPLACE = 0;
var DISPLACE2 = 0;
var MAGNITUDE = 200;

export function setup(args)
{
    args.features = [ "mv" ];
}

export function glitch_frame(frame)
{
    var do_or_not = Math.random() * 100;
    // only do the glitch if our random number crosses the threshold
    if(do_or_not > threshold){
        DISPLACE = Math.random() * MAGNITUDE;
        DISPLACE2 = Math.random() * MAGNITUDE;
        var n_DIR = Math.random() * 100;
        if(n_DIR > 50){
            DISPLACE = 0-DISPLACE;
        }
        n_DIR = Math.random() * 100;
        if (n_DIR > 50)
            DISPLACE2 *= -1;
        // bail out if we have no forward motion vectors
        const fwd_mvs = frame.mv?.forward;
        if ( !fwd_mvs )
            return;

        // set motion vector overflow behaviour in ffedit to "truncate"
        frame.mv.overflow = "truncate";

        fwd_mvs.forEach((mv) => {
            mv[1] += Math.random() * DISPLACE2;
        });
    }
}
