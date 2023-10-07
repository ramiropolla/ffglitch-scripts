/*********************************************************************/
/* motion vectors */
function get_mvs_internal(frame, overflow, which)
{
  // bail out if we have no motion vectors
  let mvs = frame["mv"];
  if ( !mvs )
    return;
  // bail out if we have no forward motion vectors
  let fwd_mvs = mvs[which];
  if ( !fwd_mvs )
    return;
  if ( overflow )
    mvs.overflow = overflow;
  return fwd_mvs;
}

/* Get forward motion vectors and set overflow flag */
export function get_forward_mvs(frame, overflow)
{
  return get_mvs_internal(frame, overflow, "forward");
}

/* Get backward motion vectors and set overflow flag */
export function get_backward_mvs(frame, overflow)
{
  return get_mvs_internal(frame, overflow, "backward");
}
