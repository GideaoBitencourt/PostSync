import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Informacoes } from '../../components/informacoes/informacoes';

interface FuelUp {
  date: Date;
  fuel: string;
  liters: number;
  total: number;
  pointsEarned: number;
  icon: string;
  iconColor: string;
}

interface Reward {
  points: number;
  discount: number;
  featured?: boolean;
}

@Component({
  selector: 'app-cliente-painel',
  standalone: true,
  imports: [CommonModule, Informacoes],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class Cliente {

  customerName = 'Marcelo';

  // ---------- preço em destaque ----------
  todayFuel = 'Gasolina Comum';
  todayPrice = 5.89;
  priceChange = -0.10; // negativo = queda em relação à semana passada

  otherPrices = [
    { fuel: 'Etanol', price: 4.35 },
    { fuel: 'Gasolina Aditivada', price: 6.73 }
  ];

  // ---------- histórico de abastecimentos ----------
  fuelUps: FuelUp[] = [
    { date: new Date(2026, 8, 12), fuel: 'Gasolina Comum', liters: 40.00, total: 235.60, pointsEarned: 23, icon: '⛽', iconColor: '#2F6FED' },
    { date: new Date(2026, 7, 28), fuel: 'Gasolina Comum', liters: 32.50, total: 191.75, pointsEarned: 19, icon: '⛽', iconColor: '#2F6FED' },
    { date: new Date(2026, 7, 14), fuel: 'Etanol', liters: 30.00, total: 123.00, pointsEarned: 12, icon: '🌱', iconColor: '#2E9E5B' },
    { date: new Date(2026, 7, 2), fuel: 'Gasolina Aditivada', liters: 45.00, total: 270.45, pointsEarned: 27, icon: '⛽', iconColor: '#D9A404' },
    { date: new Date(2026, 6, 15), fuel: 'Gasolina Comum', liters: 38.00, total: 223.42, pointsEarned: 22, icon: '⛽', iconColor: '#2F6FED' }
  ];

  // saldo de pontos: soma de todos os pontos ganhos no histórico de abastecimentos.
  // à medida que o cliente resgata descontos, esse valor vai sendo debitado (ver redeem()).
    pointsBalance = this.fuelUps.reduce((sum, f) => sum + f.pointsEarned, 0);

  nextMilestone = 1500;

  rewards: Reward[] = [
    { points: 50, discount: 1.00 },
    { points: 100, discount: 2.50 },
    { points: 200, discount: 5.00, featured: true }
  ];

  isMenuOpen = false;

  // ---------- modal de código de resgate ----------
  redeemedReward: Reward | null = null;
  redeemCode = '';
  redeemExpiresAt: Date | null = null;

  get progressPercent(): number {
    return Math.min(100, Math.round((this.pointsBalance / this.nextMilestone) * 100));
  }

  get pointsToNextMilestone(): number {
    return Math.max(0, this.nextMilestone - this.pointsBalance);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  canRedeem(reward: Reward): boolean {
    return this.pointsBalance >= reward.points;
  }

  redeem(reward: Reward): void {
    if (!this.canRedeem(reward)) return;

    this.pointsBalance -= reward.points;
    this.redeemedReward = reward;
    this.redeemCode = this.generateCode();

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);
    this.redeemExpiresAt = expires;
  }

  closeRedeemModal(): void {
    this.redeemedReward = null;
    this.redeemCode = '';
    this.redeemExpiresAt = null;
  }

  copyCode(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.redeemCode).catch(() => {});
    }
  }

  private generateCode(): string {
    const digits = Math.floor(100000 + Math.random() * 900000);
    return `PSY-${digits}`;
  }

  // ---------- formatação ----------
  formatCurrency(value: number): string {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatLiters(value: number): string {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' L';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  formatNumber(value: number): string {
    return value.toLocaleString('pt-BR');
  }
}