import { ElectricalSymbol } from "@/types";

export const ELECTRICAL_SYMBOLS: ElectricalSymbol[] = [
  {
    id: "resistor",
    name: "Resistor",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 10 L10 5 L15 15 L20 5 L25 15 L30 5 L35 10" stroke="currentColor" fill="none" /></svg>',
    description:
      "A passive two-terminal electrical component that implements electrical resistance as a circuit element.",
  },
  {
    id: "capacitor",
    name: "Capacitor",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 5 L15 15 M25 5 L25 15" stroke="currentColor" fill="none" stroke-width="2" /></svg>',
    description: "A device that stores electrical energy in an electric field.",
  },
  {
    id: "inductor",
    name: "Inductor",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 10 Q10 3 15 10 Q20 17 25 10 Q30 3 35 10" stroke="currentColor" fill="none" /></svg>',
    description:
      "A passive two-terminal electrical component that stores energy in a magnetic field when electric current flows through it.",
  },
  {
    id: "diode",
    name: "Diode",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 5 L15 15 M15 10 L25 5 L25 15 L15 10" stroke="currentColor" fill="none" /></svg>',
    description:
      "A two-terminal electronic component that conducts current primarily in one direction.",
  },
  {
    id: "transistor",
    name: "Transistor",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 5 L15 15 M20 0 L20 20 M25 5 L25 15" stroke="currentColor" fill="none" /></svg>',
    description:
      "A semiconductor device used to amplify or switch electronic signals and electrical power.",
  },
  {
    id: "battery",
    name: "Battery",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L30 10 M15 5 L15 15 M25 7 L25 13" stroke="currentColor" fill="none" stroke-width="2" /></svg>',
    description:
      "A device consisting of one or more electrochemical cells that convert stored chemical energy into electrical energy.",
  },
  {
    id: "ground",
    name: "Ground",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 5 L20 15 M10 15 L30 15 M13 18 L27 18 M16 21 L24 21" stroke="currentColor" fill="none" /></svg>',
    description:
      "A reference point in an electrical circuit from which voltages are measured.",
  },
  {
    id: "switch",
    name: "Switch",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L20 5 L30 10" stroke="currentColor" fill="none" /></svg>',
    description:
      "An electrical component that can disconnect or connect the conducting path in an electrical circuit.",
  },
  {
    id: "fuse",
    name: "Fuse",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L30 10 M15 7 L25 13" stroke="currentColor" fill="none" /></svg>',
    description:
      "A safety device that protects an electric circuit from excessive current.",
  },
  {
    id: "transformer",
    name: "Transformer",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5 Q15 5 15 10 Q15 15 20 15 M20 5 Q25 5 25 10 Q25 15 30 15" stroke="currentColor" fill="none" /></svg>',
    description:
      "An electrical device that transfers electrical energy between two or more circuits through electromagnetic induction.",
  },
  {
    id: "voltmeter",
    name: "Voltmeter",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="10" r="9" stroke="currentColor" fill="none" /><text x="20" y="14" font-size="10" text-anchor="middle" fill="currentColor">V</text></svg>',
    description:
      "An instrument used for measuring electrical potential difference between two points in an electric circuit.",
  },
  {
    id: "ammeter",
    name: "Ammeter",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="10" r="9" stroke="currentColor" fill="none" /><text x="20" y="14" font-size="10" text-anchor="middle" fill="currentColor">A</text></svg>',
    description:
      "An instrument used to measure the electric current in a circuit.",
  },
  {
    id: "led",
    name: "LED",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 5 L15 15 M15 10 L25 5 L25 15 L15 10 M25 5 L28 2 M25 8 L28 5" stroke="currentColor" fill="none" /></svg>',
    description:
      "A semiconductor light source that emits light when current flows through it.",
  },
  {
    id: "motor",
    name: "Motor",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="10" r="9" stroke="currentColor" fill="none" /><text x="20" y="14" font-size="10" text-anchor="middle" fill="currentColor">M</text></svg>',
    description:
      "A device that converts electrical energy into mechanical energy.",
  },
  {
    id: "speaker",
    name: "Speaker",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5 L15 5 L20 0 L20 20 L15 15 L10 15 Z" stroke="currentColor" fill="none" /></svg>',
    description:
      "An electroacoustic transducer that converts an electrical audio signal into sound.",
  },
  {
    id: "antenna",
    name: "Antenna",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 20 L20 0 M15 5 L25 5 M13 10 L27 10 M10 15 L30 15" stroke="currentColor" fill="none" /></svg>',
    description: "A device used to transmit or receive electromagnetic waves.",
  },
  {
    id: "op-amp",
    name: "Op-Amp",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 L10 20 L30 10 Z" stroke="currentColor" fill="none" /></svg>',
    description:
      "An integrated circuit that operates as a voltage amplifier with very high gain.",
  },
  {
    id: "oscillator",
    name: "Oscillator",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 10 Q10 0 15 10 Q20 20 25 10 Q30 0 35 10" stroke="currentColor" fill="none" /></svg>',
    description:
      "An electronic circuit that produces a periodic, oscillating electronic signal.",
  },
  {
    id: "relay",
    name: "Relay",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 10 L15 10 M25 10 L35 10 M15 5 L25 15 M20 0 L20 5 M20 15 L20 20" stroke="currentColor" fill="none" /></svg>',
    description:
      "An electrically operated switch that uses an electromagnet to mechanically operate a switch.",
  },
  {
    id: "microphone",
    name: "Microphone",
    svg: '<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="10" r="8" stroke="currentColor" fill="none" /><path d="M20 18 L20 25 M15 25 L25 25" stroke="currentColor" fill="none" /></svg>',
    description:
      "An acoustic-to-electric transducer that converts sound into an electrical signal.",
  },
];
