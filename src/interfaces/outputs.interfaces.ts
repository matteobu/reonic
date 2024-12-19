// Common Output Interfaces
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

// Consumption Table
interface TooltipState {
  content: string;
  x: number;
  y: number;
}

interface ConsumptionDailyData {
  day: string;
  totalEnergy: number;
  totalEvents: number;
}

interface SummaryData {
  title: string;
  energy?: string;
  events?: string;
  extraContent?: string;
}

interface SummaryBoxGridProps {
  summaryData: SummaryData[];
}

type DailyDataKeys = 'BULK' | 'FLOATING' | 'ABS';

// Hourly Chart
interface HourlyData {
  hour: string;
  [key: string]: number | string;
}

// Total Energy Chart
interface TotalEnergyChartProps {
  selectedDate: string;
  filteredData: ChargePointData[];
}

export type {
  ChargePointData,
  CustomLabelProps,
  DailyData,
  WeeklySummary,
  MonthlySummary,
  AnnualSummary,
  TooltipState,
  DailyDataKeys,
  HourlyData,
  TotalEnergyChartProps,
  ConsumptionDailyData,
  SummaryData,
  SummaryBoxGridProps,
};
