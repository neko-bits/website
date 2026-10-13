export const site = {
  name: 'nekobits',
  legalName: 'nekobits S.r.l.',
  email: 'info@nekobits.it',
  title: 'nekobits — Technology that serves. And stays yours.',
  description:
    'nekobits builds personal and IoT devices with on-device AI: private by design, low power, e-ink displays and LoRa mesh connectivity.',
} as const;

export interface NavItem {
  href: string;
  label: string;
}

export const nav: readonly NavItem[] = [
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#features', label: 'Features' },
  { href: '/#applications', label: 'Applications' },
  { href: '/#contact', label: 'Contact' },
];

export interface Feature {
  /** Monospace label from the brand infographic; visual only. */
  tag: string;
  title: string;
  text: string;
}

export const features: readonly Feature[] = [
  { tag: 'EDGE_AI', title: 'AI on the device', text: 'Models run locally. The cloud is optional, never required.' },
  { tag: 'PRIVACY_BY_DESIGN', title: 'Your data stays yours', text: 'Data stays with the user. No telemetry by default.' },
  { tag: 'LOW_POWER', title: 'Low power', text: 'Low-power microcontrollers that run long on little energy.' },
  { tag: 'E_INK', title: 'Easy to read', text: 'E-ink displays, sharp in any light, even direct sun.' },
  { tag: 'LORA_MESH', title: 'Connected off-grid', text: 'LoRa mesh radio: messages get through without cellular coverage.' },
  { tag: 'LOCATION', title: 'Location aware', text: 'Positioning indoors and outdoors.' },
];

export interface Item {
  title: string;
  text: string;
}

export const applications: readonly Item[] = [
  { title: 'High-legibility reading', text: 'Large, sharp text on e-ink, readable in full sun without eye strain.' },
  { title: 'Home and senior living', text: 'Reminders, messages and information on simple screens.' },
  { title: 'Mountains and outdoors', text: 'Messages and position over mesh where phones have no signal.' },
];

export const technologies: readonly string[] = [
  'Edge AI',
  'ESP32-S3',
  'ESP32-P4',
  'E-ink',
  'LoRa',
  'Meshtastic',
  'Indoor/outdoor positioning',
  'Low power',
  'Privacy by design',
];
