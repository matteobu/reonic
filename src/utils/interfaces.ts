interface DailyData {
  day: string;
  BULK: number;
  FLOATING: number;
  ABS: number;
  totalEnergy: number;
  events: number;
  peakDemand: number;
  errors: number;
}

interface WeeklySummary {
  week: string;
  totalEnergy: number;
  events: number;
  errors: number;
}

interface MonthlySummary {
  month: string;
  totalEnergy: number;
  events: number;
  errors: number;
}

interface AnnualSummary {
  year: number;
  totalEnergy: number;
  events: number;
  errors: number;
}

interface ChargePointData {
  id: string;
  pMax: number;
  errors: number;
  dailyData: DailyData[];
  weeklySummary: WeeklySummary[];
  monthlySummary: MonthlySummary[];
  annualSummary: AnnualSummary[];
}

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  yieldValue: number;
  pMax: number;
  errors: number;
}

export type {
  ChargePointData,
  CustomLabelProps,
  DailyData,
  WeeklySummary,
  MonthlySummary,
  AnnualSummary,
};
