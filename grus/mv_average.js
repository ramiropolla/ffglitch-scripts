// ./qjs zmq_setter.js '{"mv_average.tail_length":10}'

import * as zmq from "zmq";

/*********************************************************************/
const addr_getter_ipc = "ipc:///tmp/ffglitch-getter";

/*********************************************************************/
class Command
{
  constructor()
  {
    this.tail_length = 10;
    this.prev_fwd_mvs = [ ];
  }

  setup(tail_length)
  {
    this.tail_length = tail_length;
  }

  run(fwd_mvs)
  {
    // update variable holding forward motion vectors from previous
    // frames. note that we perform a deep copy of the clean motion
    // vector values before modifying them.
    const deep_copy = fwd_mvs.dup();
    // push to the end of array
    this.prev_fwd_mvs.push(deep_copy);

    // initialize total_sum to a [0,0] MV2DArray.
    if ( !this.total_sum )
        this.total_sum = new MV2DArray(fwd_mvs.width, fwd_mvs.height);

    // update total_sum by removing the motion vector values from the
    // oldest frame and adding the values from the current frame.
    while ( this.prev_fwd_mvs.length > this.tail_length )
    {
        this.total_sum.sub(this.prev_fwd_mvs[0]);
        this.prev_fwd_mvs = this.prev_fwd_mvs.slice(1);
    }
    this.total_sum.add(deep_copy);

    // set new values for current frame to (total_sum / tail_length)
    if ( this.prev_fwd_mvs.length == this.tail_length )
    {
        fwd_mvs.assign(this.total_sum);
        fwd_mvs.div(MV(this.tail_length, this.tail_length));
    }
  }
}

/*********************************************************************/
let command;

let zmqctx;
let zmqsocket;

function zmqsocket_request()
{
  zmqsocket.send("mv_average.tail_length");
}

export function setup(args)
{
  args.features = [ "mv" ];

  // get input filename
  const input_fname = args.input;

  // create a new output filename based on the current time
  // and the input filename
  const date_str = new Date().toISOString().replaceAll(':', '_');
  const output_fname = `glitched_${date_str}_${input_fname}`;
  args.output = output_fname;
  console.log(`Output filename is "${output_fname}"`);

  zmqctx = new zmq.Context();
  zmqsocket = zmqctx.socket(zmq.REQ);
  zmqsocket.connect(addr_getter_ipc);
  zmqsocket_request();

  command = new Command();
}

export function glitch_frame(frame, stream)
{
  const data_str = zmqsocket.recv_str();
  zmqsocket_request();
  let tail_length = null;
  try {
    tail_length = JSON.parse(data_str);
  } catch (e) {
    console.log(`mv_average: JSON.parse('${tail_length}'):`, e);
  }
  if ( tail_length )
    command.setup(tail_length);
  const mvs = frame.mv?.forward;
  if ( !mvs )
    return;
  frame.mv.overflow = "truncate";
  return command.run(mvs);
}
