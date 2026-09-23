import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FuelPrice, FuelUp, PointsEvent } from '../../models/clientes';

type Tab = 'precos' | 'abastecimentos' | 'beneficios';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {

  // regras do programa de fidelidade
  readonly pointsPerLiter = 5;
  readonly pointsToReal = 0.01; // 100 pontos = R$ 1,00
  readonly minRedeem = 100;
 
  activeTab: Tab = 'precos';
 
  customerName = 'Marcos Andrade';
  pointsBalance = 2380;
 
  redeemAmount = 200;
  confirmationMessage: string | null = null;
  private confirmationTimeout?: ReturnType<typeof setTimeout>;
 
  prices: FuelPrice[] = [
    { fuel: 'Gasolina Comum', price: 5.77, updatedAt: this.hoursAgo(2), trend: 'up', changePercent: 1.2 },
    { fuel: 'Gasolina Aditivada', price: 6.09, updatedAt: this.hoursAgo(2), trend: 'up', changePercent: 0.8 },
    { fuel: 'Etanol', price: 4.29, updatedAt: this.hoursAgo(2), trend: 'down', changePercent: 0.5 },
    { fuel: 'Diesel S10', price: 6.15, updatedAt: this.hoursAgo(5), trend: 'stable', changePercent: 0 }
  ];
 
  fuelUps: FuelUp[] = [
    { date: this.daysAgo(2), posto: 'Posto Central', fuel: 'Gasolina Comum', liters: 32.45, total: 187.28, pointsEarned: 162 },
    { date: this.daysAgo(9), posto: 'Posto Central', fuel: 'Etanol', liters: 28.10, total: 120.55, pointsEarned: 140 },
    { date: this.daysAgo(16), posto: 'Posto Vista Alegre', fuel: 'Gasolina Aditivada', liters: 40.00, total: 243.60, pointsEarned: 200 },
    { date: this.daysAgo(24), posto: 'Posto Central', fuel: 'Diesel S10', liters: 55.30, total: 340.10, pointsEarned: 276 }
  ];
 
  pointsHistory: PointsEvent[] = [
    { date: this.daysAgo(2), type: 'ganho', points: 162, description: 'Abastecimento — Gasolina Comum' },
    { date: this.daysAgo(9), type: 'ganho', points: 140, description: 'Abastecimento — Etanol' },
    { date: this.daysAgo(15), type: 'resgate', points: 300, description: 'Desconto aplicado no abastecimento' },
    { date: this.daysAgo(16), type: 'ganho', points: 200, description: 'Abastecimento — Gasolina Aditivada' },
    { date: this.daysAgo(24), type: 'ganho', points: 276, description: 'Abastecimento — Diesel S10' }
  ];
 
  // ---------- navegação ----------
  selectTab(tab: Tab): void {
    this.activeTab = tab;
  }
 
  // ---------- resumo de abastecimentos ----------
  get totalLitrosMes(): number {
    return this.fuelUps.reduce((sum, f) => sum + f.liters, 0);
  }
 
  get totalGastoMes(): number {
    return this.fuelUps.reduce((sum, f) => sum + f.total, 0);
  }
 
  // ---------- benefícios / resgate ----------
  get discountValue(): number {
    return this.redeemAmount * this.pointsToReal;
  }
 
  get canRedeem(): boolean {
    return this.pointsBalance >= this.minRedeem &&
      this.redeemAmount >= this.minRedeem &&
      this.redeemAmount <= this.pointsBalance;
  }
 
  applyRedeem(): void {
    if (!this.canRedeem) return;
 
    this.pointsBalance -= this.redeemAmount;
    this.pointsHistory.unshift({
      date: new Date(),
      type: 'resgate',
      points: this.redeemAmount,
      description: 'Desconto aplicado no abastecimento'
    });
 
    this.confirmationMessage =
      `Desconto de ${this.formatCurrency(this.discountValue)} aplicado no seu próximo abastecimento.`;
 
    if (this.confirmationTimeout) clearTimeout(this.confirmationTimeout);
    this.confirmationTimeout = setTimeout(() => this.confirmationMessage = null, 5000);
 
    this.redeemAmount = Math.min(this.minRedeem, this.pointsBalance);
  }
 
  // ---------- formatação ----------
  formatCurrency(value: number): string {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
 
  formatLiters(value: number): string {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' L';
  }
 
  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }
 
  formatDateTime(date: Date): string {
    return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
 
  private daysAgo(days: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  }
 
  private hoursAgo(hours: number): Date {
    const d = new Date();
    d.setHours(d.getHours() - hours);
    return d;
  }
}
