export type EnvironmentMode = 'sunset' | 'aurora' | 'storm';
export type FinishOption = 'titanium' | 'carbon' | 'gold' | 'nebula';

export interface TelemetryMetric {
  label: string;
  value: string;
  unit: string;
  status: 'OPTIMAL' | 'SYNCED' | 'ACTIVE' | 'SUPERCHARGED';
  progress?: number;
}

export interface PortalData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  altitude: string;
  coordinates: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  accentColor: string;
}

export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  category: 'AERO' | 'POWERTRAIN' | 'CHASSIS' | 'QUANTUM';
  title: string;
  detail: string;
  stat: string;
  statLabel: string;
}
