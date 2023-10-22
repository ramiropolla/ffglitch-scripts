const net = require('net');

// usage: node mv_repeater.js <host> <port>

// port is 'č' -> '0xc48d' -> 50317
// port is 'mv' -> 0x6d76 -> 19798
// port is 'ff' -> 0x6666 -> 26214

function usage(argv) {
  console.error(`usage: ${argv[0]} ${argv[1]} <host> <port> <action> [data]`);
  process.exit(1);
}

async function main(argv) {
  /* parse main parameters */
  if ( argv.length < 5 )
    usage(argv);
  const host = argv[2];
  const port = +argv[3];
  if ( isNaN(port) )
    usage(argv);
  const action = argv[4];
  let do_read;
  let write_data;
  switch ( action ) {
    case "read":
      do_read = true;
      break;
    case "write":
      if ( argv.length < 6 )
        usage();
      do_read = false;
      write_data = argv[5];
      break;
    default:
      usage();
      break;
  }

  const client = net.Socket();
  client.on('error', (e) => {
    console.error(e);
  });
  client.on('data', (data) => {
    console.log(data);
    client.destroy();
  });
  client.connect(port, host, () => {
    console.log('Connected');
    if ( do_read ) {
      const length = 1;
      const buffer = Buffer.alloc(length);
      buffer.writeUInt8(1, 0);
      client.write(buffer);
    } else {
      const length = 1 + 4 + write_data.length;
      const buffer = Buffer.alloc(length);
      buffer.writeUInt8(0, 0);
      buffer.writeInt32LE(write_data.length, 1);
      buffer.write(write_data, 5);
      client.write(buffer);
    }
  });
}

(async () => {
  await main(process.argv);
})();
