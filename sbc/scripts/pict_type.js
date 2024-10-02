import * as zmq from "zmq";

/*********************************************************************/
const addr_getter_ipc = "ipc:///tmp/ffglitch-getter";

/*********************************************************************/
class Command
{
  constructor()
  {
    this.frame_count = 0;
    // Return "I" for first frame
    this.next_ice_cream = 1;
  }

  setup(nb_frames)
  {
    this.next_ice_cream = this.frame_count + nb_frames;
  }

  run(nb_frames)
  {
    this.frame_count++;
    if ( nb_frames !== null && nb_frames !== 0 )
      this.setup(nb_frames);
    if ( this.frame_count === this.next_ice_cream )
      return "I";
    return "P";
  }
}

/*********************************************************************/
let command;

let zmqctx;
let zmqsocket;

function zmqsocket_request()
{
  zmqsocket.send("cleaner.pict_type");
}

export function setup()
{
  zmqctx = new zmq.Context();
  zmqsocket = zmqctx.socket(zmq.REQ);
  zmqsocket.connect(addr_getter_ipc);
  zmqsocket_request();

  command = new Command();
}

export function pict_type_func(args)
{
  const data_str = zmqsocket.recv_str();
  zmqsocket_request();
  let nb_frames = null;
  try {
    nb_frames = JSON.parse(data_str);
  } catch (e) {
    console.log(`pict_type_func: JSON.parse('${data_str}'):`, e);
    return "I";
  }
  return command.run(nb_frames);
}
