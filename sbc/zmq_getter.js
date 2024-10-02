import * as zmq from "zmq";

/*********************************************************************/
const addr_getter_ipc = "ipc:///tmp/ffglitch-getter";

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

  // Create a REQ socket
  const socket = ctx.socket(zmq.REQ);
  socket.connect(addr_getter_ipc);

  // Send the message
  socket.send(message);
  console.log(`Sent: ${message}`);

  // Receive the response
  const data_str = socket.recv_str();
  console.log(`Received: ${JSON.parse(data_str)}`);

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
