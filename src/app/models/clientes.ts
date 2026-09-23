
type Trend = 'up' | 'down' | 'stable';

export interface FuelPrice {
  fuel: string;
  price: number;
  updatedAt: Date;
  trend: Trend;
  changePercent: number;
}
 
export interface FuelUp {
  date: Date;
  posto: string;
  fuel: string;
  liters: number;
  total: number;
  pointsEarned: number;
}
 
export interface PointsEvent {
  date: Date;
  type: 'ganho' | 'resgate';
  points: number;
  description: string;
}
 