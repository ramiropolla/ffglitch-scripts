import { MIDIInput } from "./midi.js";

const midiin = new MIDIInput();
let midi_val = false;

export function setup()
{
  midiin.setup();
  midiin.onbutton(32, function(v) { midi_val = (v !== 0); });
}

export function pict_type_func(args)
{
  return midi_val ? "I" : "P";
}
