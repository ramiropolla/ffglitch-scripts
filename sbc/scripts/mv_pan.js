import * as zmq from "zmq";

/*********************************************************************/
const addr_getter_ipc = "ipc:///tmp/ffglitch-getter";

/*********************************************************************/
class Command
{
  constructor()
  {
    this.cur_mv = MV(0, 0);
  }

  setup(cur_mv)
  {
    this.cur_mv = MV(cur_mv[0], cur_mv[1]);
  }

  run(mvs)
  {
    mvs.add(this.cur_mv);
  }
}

/*********************************************************************/
let command;

let zmqctx;
let zmqsocket;

function zmqsocket_request()
{
  zmqsocket.send("mv_pan.mv");
}

export function setup(args)
{
  args.features = [ "mv" ];

  // get input filename
  const input_fname = args.input;

  if ( 0 )
  {
  // create a new output filename based on the current time
  // and the input filename
  const date_str = new Date().toISOString().replaceAll(':', '_');
  const output_fname = `glitched_${date_str}_${input_fname}`;
  args.output = output_fname;
  console.log(`Output filename is "${output_fname}"`);
  }

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
  let cur_mv = null;
  try {
    cur_mv = JSON.parse(data_str);
  } catch (e) {
    console.log(`mv_pan: JSON.parse('${cur_mv}'):`, e);
  }
  if ( cur_mv )
    command.setup(cur_mv);
  const mvs = frame.mv?.forward;
  if ( !mvs )
    return;
  frame.mv.overflow = "truncate";
  return command.run(mvs);
}
