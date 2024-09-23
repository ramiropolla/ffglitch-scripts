import * as rtmidi from "rtmidi";

export class MIDIInput
{
  constructor()
  {
    this.midiin = new rtmidi.In();
    this.log = false;
  }

  setup(arg)
  {
    let port_name;
    let port_num;
    const midiin = this.midiin;

    // Check arguments
    if ( arg !== undefined )
    {
      if ( isNaN(arg) )
        port_name = arg;
      else
        port_num = parseInt(arg);
    }

    // Check if any MIDI ports are available
    const count = midiin.getPortCount();
    console.log(`RtMidi: ${count} port${count === 1 ? "" : "s"} found`);
    if ( count === 0 )
      throw "No MIDI ports";

    // Print names and select port number
    for ( let i = 0; i < count; i++ )
    {
      const name = midiin.getPortName(i);
      if ( name == port_name )
        port_num = i;
      console.log(`${i}. ${name}`);
    }

    // Sanity check for port name
    if ( port_name !== undefined && port_num === undefined )
    {
      console.log(`Selected port name (${port_name}) is not available.`);
      throw "Bad MIDI port name";
    }

    // Sanity check for port number
    if ( port_num >= count )
    {
      console.log(`Selected port number (${port_num}) greater than real number of ports (${count}).`);
      throw "Bad MIDI port number";
    }

    // No port selected yet, use heuristics
    if ( port_num === undefined )
    {
      for ( let i = 0; i < count; i++ )
      {
        const name = midiin.getPortName(i);
        if ( name.includes("Midi Through") )
          continue;
        if ( port_num === undefined ) {
          port_num = i;
          break;
        }
      }
    }

    // Check if any device was found
    if ( port_num === undefined )
    {
      console.log("No MIDI device found.");
      throw "Bad MIDI port number";
    }

    // Open input port
    console.log(`Opening input port number ${port_num}`);
    midiin.openPort(port_num);

    // Prepare last_vals and setup callback
    midiin.ignoreTypes(false, false, false);
  }

  setlog(b)
  {
    this.log = b;
  }

  parse_messages(func)
  {
    const midiin = this.midiin;
    if ( !midiin.isPortOpen() )
      return -1;
    let count = 0;
    while ( 42 )
    {
      const msg = midiin.getMessage();
      const msglen = msg.length;
      if ( msglen == 0 )
        break;
      count++;
      if ( this.log )
        console.log(JSON.stringify(msg));
      if ( msglen == 3 )
      {
        if ( msg[0] == 176 )
          func.call(this, msg);
      }
    }
    return count;
  }
}
