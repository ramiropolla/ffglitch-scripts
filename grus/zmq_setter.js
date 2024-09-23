import * as zmq from "zmq";

/*********************************************************************/
const addr_setter_ipc = "ipc:///tmp/ffglitch-setter";
// const addr_setter_tcp = "tcp://localhost:4646";

/*********************************************************************/
function main(argv)
{
  if ( argv.length < 2 )
  {
    console.log("Usage: qjs script.js <message>");
    return;
  }

  const message = argv[1];

  // Initialize a zmq context
  const ctx = new zmq.Context();

  // Create a PUSH socket
  const socket = ctx.socket(zmq.PUSH);
  socket.connect(addr_setter_ipc);

  // Send the message
  socket.send(message);
  console.log(`Sent: ${message}`);

  // Clean up
  socket.close();
  ctx.term();
}

try {
  main(scriptArgs);
} catch (e) {
  console.log("Uncaught exception!");
  console.log(e);
  if ( e.stack )
    console.log(e.stack);
}
