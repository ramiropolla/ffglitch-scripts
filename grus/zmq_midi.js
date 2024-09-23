import { MIDIInput } from "./helpers/midi.js";
import * as zmq from "zmq";
import * as os from "os";

/*********************************************************************/
const addr_setter_ipc = "ipc:///tmp/ffglitch-setter";
// const addr_setter_tcp = "tcp://localhost:4646";

/*********************************************************************/
const verbose = true;

/*********************************************************************/
function main(argv)
{
  const zmqctx = new zmq.Context();
  const socket = zmqctx.socket(zmq.PUSH);
  socket.connect(addr_setter_ipc);

  const midiin = new MIDIInput();
  midiin.setup(argv[1]);
  midiin.setlog(verbose);
  while ( 42 )
  {
    const count = midiin.parse_messages(msg => {
      const control = msg[1];
      const val = msg[2];
      socket.send(`{"midi.${control}":${val}}`);
    });
    if ( count < 0 )
      break;
    if ( count == 0 )
      os.sleep(1);
  }

  socket.close();
  zmqctx.term();
}

try {
  main(scriptArgs);
} catch (e) {
  console.log("Uncaught exception!");
  console.log(e);
  if ( e.stack )
    console.log(e.stack);
}

console.log("Thank you, come again!");
