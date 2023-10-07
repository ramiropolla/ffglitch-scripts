/*********************************************************************/
/* parameters */

// value to subtract from the vertical element of all motion vectors in
// the frame.
const value = 5;

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

  fwd_mvs.sub_v(value);
}
