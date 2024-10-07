import { MIDIInput } from "./midi.js";

const midiin = new MIDIInput();
midiin.setup();
midiin.setlog(true);
while (true)
    midiin.parse_events();
