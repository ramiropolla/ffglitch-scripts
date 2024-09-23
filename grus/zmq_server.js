import * as zmq from "zmq";

/*********************************************************************/
const addr_setter_tcp = "tcp://*:4646";
const addr_setter_ipc = "ipc:///tmp/ffglitch-setter";
const addr_getter_tcp = "tcp://*:4747";
const addr_getter_ipc = "ipc:///tmp/ffglitch-getter";

/*********************************************************************/
let state = {};

/*********************************************************************/
const verbose = true;

/*********************************************************************/
// Setter function
function setter_entry(field, value)
{
  // Split the field string into an array of keys
  const keys = field.split('.');
  let current = state;

  // Traverse the state object to the appropriate depth
  for ( let i = 0; i < keys.length - 1; i++ )
  {
    const key = keys[i];

    // Create the object if it doesn't exist
    if ( !(key in current) )
      current[key] = {};

    // Move deeper into the object
    current = current[key];
  }

  // Set the value
  const key = keys[keys.length - 1];
  current[key] = value;
  if ( verbose )
    console.log(`setter: ${field} = ${value}`);
}

function setter(data_str)
{
  if ( !data_str )
  {
    console.log("setter: ignoring empty string");
    return;
  }

  // Parse the JSON string
  let data;
  try {
    data = JSON.parse(data_str);
  } catch (e) {
    console.log(`setter: JSON.parse('${data_str}'):`, e);
    return;
  }

  // Set each field
  for ( const key in data )
    setter_entry(key, data[key]);
}

// Getter function
function getter(field)
{
  if ( !field )
  {
    console.log("getter: ignoring empty string");
    return null;
  }

  // Split the field string into an array of keys
  const keys = field.split('.');
  let current = state;
  let reset_count;

  // Traverse the state object to find the requested field
  for ( let i = 0; i < keys.length; i++ )
  {
    const key = keys[i];

    // Return null if any part of the field path is not found
    if ( !(key in current) )
    {
      console.log(`getter: state.${field}: '${key}' not found`);
      return null;
    }

    // Move deeper into the object
    const next = current[key];
    if ( i == (keys.length - 1) )
    {
      reset_count = current["reset_" + key];
      if ( reset_count )
      {
        // TODO try { reset_count--; } catch (e) { ... }
        reset_count--;
        if ( reset_count === 0 )
        {
          delete current["reset_" + key];
          current[key] = null;
        }
        else
        {
          current["reset_" + key] = reset_count;
        }
      }
    }
    current = next;
  }

  if ( verbose )
    console.log(`getter: ${field}${(reset_count !== undefined) ? ` (reset ${reset_count})` : ""}: ${JSON.stringify(current)}`);

  // Return the found value
  return current;
}

/*********************************************************************/
function open_zmq_socket(zmqctx, type, addr)
{
  const socket = zmqctx.socket(type);
  try {
    socket.bind(addr);
  } catch (e) {
    console.log(`socket.bind('${addr}'):`, e);
    return undefined;
  }
  return socket;
}

function main()
{
  const zmqctx = new zmq.Context();
  const poller = new zmq.Poller();

  // Open sockets
  const socket_setter_tcp = open_zmq_socket(zmqctx, zmq.PULL, addr_setter_tcp);
  const socket_setter_ipc = open_zmq_socket(zmqctx, zmq.PULL, addr_setter_ipc);
  const socket_getter_tcp = open_zmq_socket(zmqctx, zmq.REP,  addr_getter_tcp);
  const socket_getter_ipc = open_zmq_socket(zmqctx, zmq.REP,  addr_getter_ipc);
  if ( !socket_setter_tcp || !socket_setter_ipc || !socket_getter_tcp || !socket_getter_ipc)
    return;

  // Add sockets to poller
  poller.add(socket_setter_tcp, zmq.POLLIN, 1);
  poller.add(socket_setter_ipc, zmq.POLLIN, 2);
  poller.add(socket_getter_tcp, zmq.POLLIN, 3);
  poller.add(socket_getter_ipc, zmq.POLLIN, 4);

  // Main loop
  while ( 42 )
  {
    // Infinite wait
    const event = poller.wait(-1);
    if ( !event )
      continue;
    const socket = event.socket;

    // Receive message
    let data_str;
    try {
      data_str = socket.recv_str();
    } catch (e) {
      // TODO should I destroy the socket and remove it from the poller?
      console.log("socket.recv_str():", e);
      break;
    }

    if ( socket == socket_getter_tcp || socket == socket_getter_ipc )
    {
      let data = getter(data_str);
      socket.send(JSON.stringify(data));
    }
    else
    {
      setter(data_str);
    }
  }
}

try {
  main();
} catch (e) {
  console.log("Uncaught exception!");
  console.log(e);
  if ( e.stack )
    console.log(e.stack);
}

console.log("Thank you, come again!");
