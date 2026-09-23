
export type PumpStatus = 'livre' | 'ocupado' | 'pausado' | 'manutencao';


export interface Occurrence {
  time: Date;
  note: string;
}


export interface Pump {
  id: number;
  label: string;
  status: PumpStatus;
  fuelType?: string;
  nozzle?: number;
  pricePerLiter?: number;
  volume?: number;
  targetVolume?: number;
  litersPerSecond?: number;
  startTime?: Date;
  attendant?: string;
  maintenanceReason?: string;
  occurrences: Occurrence[];
    
}

