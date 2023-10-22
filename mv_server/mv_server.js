const net = require('net');

// usage: node mv_repeater.js <host> <port>

// port is 'č' -> '0xc48d' -> 50317
// port is 'mv' -> 0x6d76 -> 19798
// port is 'ff' -> 0x6666 -> 26214

function usage(argv) {
  console.error(`usage: ${argv[0]} ${argv[1]} <host> <port>`);
  process.exit(1);
}

async function main(argv) {
  /* parse main parameters */
  if ( argv.length < 4 )
    usage(argv);
  const host = argv[2];
  const port = +argv[3];
  if ( isNaN(port) )
    usage(argv);

  const server = net.createServer();
  server.on('error', (e) => {
    console.error(e);
  });
  server.listen(port, host, () => {
    console.log('MV Server is running on port ' + port +'.');
  });

  let last_mv = Buffer.alloc(4);

  server.on('connection', (sock) => {
    let state = -1;

    let lenbuf = Buffer.alloc(4);

    let cur_mv;
    let cur_mv_length;

    function parse_byte(b) {
      switch ( state ) {
        case -1:
          if ( b === 0x00 ) {
            console.log("write requested");
            state = 0;
          } else if ( b === 0x01 ) {
            console.log("read requested");
            sock.write(last_mv);
          } else {
            /* ignore */
            console.error("Unknown command: " + b);
          }
          break;
        case 0:
        case 1:
        case 2:
        case 3:
          lenbuf[state++] = b;
          if ( state === 4 ) {
            cur_mv_length = lenbuf.readInt32LE();
            console.log(" length is " + cur_mv_length);
            cur_mv = Buffer.alloc(4 + cur_mv_length);
            cur_mv.writeInt32LE(cur_mv_length);
            if ( cur_mv_length === 0 ) {
              sock.write(lenbuf); /* TODO reply OK */
              console.log(" updating last_mv");
              last_mv = cur_mv;
              state = -1;
            }
          }
          break;
        default:
          cur_mv[state++] = b;
          if ( --cur_mv_length === 0 ) {
            sock.write(lenbuf); /* TODO reply OK */
            console.log(" updating last_mv");
            last_mv = cur_mv;
            state = -1;
          }
          break;
      }
    }
    sock.on('data', (data) => {
      for ( let i = 0; i < data.length; i++ )
        parse_byte(data[i]);
    });
  });
}

(async () => {
  await main(process.argv);
})();
