/*********************************************************************/
/* parameters */

// change this value to use a smaller or greater number of frames to
// perform the average of motion vectors
const tail_length = 3;

/*********************************************************************/
// global variable holding forward motion vectors from previous frames
let prev_fwd_mvs = [ ];
let total_sum;

/*********************************************************************/
import {
  get_forward_mvs,
} from "./helpers.mjs";

export function setup(args)
{
  args.features = [ "mv" ];
}

export function glitch_frame(frame, stream)
{
  const fwd_mvs = get_forward_mvs(frame, "truncate");
  // bail out if we have no motion vectors
  if ( !fwd_mvs )
    return;

  // update variable holding forward motion vectors from previous
  // frames. note that we perform a deep copy of the clean motion
  // vector values before modifying them.
  const deep_copy = fwd_mvs.dup();
  // push to the end of array
  prev_fwd_mvs.push(deep_copy);

  if ( prev_fwd_mvs.length == 1 )
  {
    // on first run, just initialize total_sum to the motion vector
    // values from the first frame.
    total_sum = deep_copy;
  }
  else
  {
    // update total_sum by removing the motion vector values from the
    // oldest frame and adding the values from the current frame.
    if ( prev_fwd_mvs.length > tail_length )
    {
      total_sum.sub(prev_fwd_mvs[0]);
      prev_fwd_mvs = prev_fwd_mvs.slice(1);
    }
    total_sum.add(deep_copy);

    // set new values for current frame to (total_sum / tail_length)
    fwd_mvs.assign(total_sum);
    fwd_mvs.div(MV(tail_length,tail_length));
  }
}
