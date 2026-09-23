import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pump, PumpStatus } from '../../models/pump';


const FUELS: { name: string; price: number }[] = [
  { name: 'Gasolina Comum', price: 5.77 },
  { name: 'Gasolina Aditivada', price: 6.09 },
  { name: 'Etanol', price: 4.29 },
  { name: 'Diesel S10', price: 6.15 }
];
 
const ATTENDANTS = ['João Marcos', 'Carla Souza', 'Rafael Lima', 'Beatriz Alves'];


@Component({
  selector: 'app-frentista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frentista.html',
  styleUrl: './frentista.css',
})
export class Frentista implements OnInit, OnDestroy {
  pumps: Pump[] = [
    { id: 1, label: 'BOMBA 01', status: 'livre', occurrences: [] },
    {
      id: 2,
      label: 'BOMBA 02',
      status: 'ocupado',
      fuelType: 'Gasolina Comum',
      nozzle: 2,
      pricePerLiter: 5.77,
      volume: 32.45,
      targetVolume: 45,
      litersPerSecond: 0.18,
      startTime: this.minutesAgo(5, 42),
      attendant: 'João Marcos',
      occurrences: []
    },
    { id: 3, label: 'BOMBA 03', status: 'livre', occurrences: [] },
    {
      id: 4,
      label: 'BOMBA 04',
      status: 'manutencao',
      maintenanceReason: 'Bico com vazamento — aguardando técnico',
      occurrences: []
    }
  ];
 
  selectedPump: Pump | null = null;
  now: Date = new Date();
 
  private tickId?: ReturnType<typeof setInterval>;
 
  ngOnInit(): void {
    this.tickId = setInterval(() => this.tick(), 1000);
  }
 
  ngOnDestroy(): void {
    if (this.tickId) clearInterval(this.tickId);
  }
 
  // ---------- simulação em tempo real ----------
  private tick(): void {
    this.now = new Date();
 
    for (const pump of this.pumps) {
      if (pump.status === 'ocupado' && pump.litersPerSecond) {
        pump.volume = (pump.volume ?? 0) + pump.litersPerSecond;
 
        if (pump.targetVolume && pump.volume >= pump.targetVolume) {
          this.finishPump(pump);
          continue;
        }
      }
 
      if (pump.status === 'livre' && Math.random() < 0.02) {
        this.startPump(pump);
      }
    }
 
    if (this.selectedPump) {
      const updated = this.pumps.find(p => p.id === this.selectedPump!.id);
      if (updated) this.selectedPump = updated;
    }
  }
 
  private startPump(pump: Pump): void {
    const fuel = FUELS[Math.floor(Math.random() * FUELS.length)];
    pump.status = 'ocupado';
    pump.fuelType = fuel.name;
    pump.pricePerLiter = fuel.price;
    pump.nozzle = Math.random() < 0.5 ? 1 : 2;
    pump.volume = 0;
    pump.targetVolume = 15 + Math.random() * 40;
    pump.litersPerSecond = 0.12 + Math.random() * 0.15;
    pump.startTime = new Date();
    pump.attendant = ATTENDANTS[Math.floor(Math.random() * ATTENDANTS.length)];
  }
 
  private finishPump(pump: Pump): void {
    pump.status = 'livre';
    pump.fuelType = undefined;
    pump.nozzle = undefined;
    pump.pricePerLiter = undefined;
    pump.volume = undefined;
    pump.targetVolume = undefined;
    pump.litersPerSecond = undefined;
    pump.startTime = undefined;
    pump.attendant = undefined;
    pump.occurrences = [];
 
    if (this.selectedPump?.id === pump.id) {
      this.selectedPump = null;
    }
  }
 
  // ---------- interação ----------
  openPump(pump: Pump): void {
    this.selectedPump = pump;
  }
 
  closePanel(): void {
    this.selectedPump = null;
  }
 
  togglePause(pump: Pump): void {
    if (pump.status === 'ocupado') {
      pump.status = 'pausado';
    } else if (pump.status === 'pausado') {
      pump.status = 'ocupado';
    }
  }
 
  registerOccurrence(pump: Pump): void {
    pump.occurrences.unshift({
      time: new Date(),
      note: 'Ocorrência registrada pelo gerente'
    });
  }
 
  // ---------- contadores do cabeçalho ----------
  get countLivre(): number {
    return this.pumps.filter(p => p.status === 'livre').length;
  }
 
  get countOcupado(): number {
    return this.pumps.filter(p => p.status === 'ocupado' || p.status === 'pausado').length;
  }
 
  get countManutencao(): number {
    return this.pumps.filter(p => p.status === 'manutencao').length;
  }
 
  // ---------- formatação ----------
  statusLabel(status: PumpStatus): string {
    switch (status) {
      case 'livre': return 'LIVRE';
      case 'ocupado': return 'ABASTECENDO';
      case 'pausado': return 'PAUSADA';
      case 'manutencao': return 'MANUT.';
    }
  }
 
  formatVolume(value?: number): string {
    if (value === undefined) return '—';
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' L';
  }
 
  formatCurrency(value?: number): string {
    if (value === undefined) return '—';
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
 
  formatTime(date?: Date): string {
    if (!date) return '—';
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
 
  formatElapsed(pump: Pump): string {
    if (!pump.startTime) return '—';
    const totalSeconds = Math.max(0, Math.floor((this.now.getTime() - pump.startTime.getTime()) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')} min ${String(seconds).padStart(2, '0')} s`;
  }
 
  partialValue(pump: Pump): number | undefined {
    if (pump.volume === undefined || pump.pricePerLiter === undefined) return undefined;
    return pump.volume * pump.pricePerLiter;
  }
 
  private minutesAgo(minutes: number, seconds: number): Date {
    const d = new Date();
    d.setMinutes(d.getMinutes() - minutes);
    d.setSeconds(d.getSeconds() - seconds);
    return d;
  }  
}

