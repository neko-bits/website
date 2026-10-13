import type { IconName } from '../components/icons';

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
  icon: IconName;
  title: string;
  text: string;
}

export const features: readonly Feature[] = [
  { tag: 'EDGE_AI', icon: 'chip', title: 'AI on the device', text: 'Models run locally. The cloud is optional, never required.' },
  { tag: 'PRIVACY_BY_DESIGN', icon: 'lock', title: 'Your data stays yours', text: 'Data stays with the user. No telemetry by default.' },
  { tag: 'LOW_POWER', icon: 'battery', title: 'Low power', text: 'Low-power microcontrollers that run long on little energy.' },
  { tag: 'E_INK', icon: 'reader', title: 'Easy to read', text: 'E-ink displays, sharp in any light, even direct sun.' },
  { tag: 'LORA_MESH', icon: 'antenna', title: 'Connected off-grid', text: 'LoRa mesh radio: messages get through without cellular coverage.' },
  { tag: 'LOCATION', icon: 'pin', title: 'Location aware', text: 'Positioning indoors and outdoors.' },
];

export interface Item {
  icon: IconName;
  title: string;
  text: string;
}

export const applications: readonly Item[] = [
  { icon: 'book', title: 'High-legibility reading', text: 'Large, sharp text on e-ink, readable in full sun without eye strain.' },
  { icon: 'home', title: 'Home and senior living', text: 'Reminders, messages and information on simple screens.' },
  { icon: 'mountain', title: 'Mountains and outdoors', text: 'Messages and position over mesh where phones have no signal.' },
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
