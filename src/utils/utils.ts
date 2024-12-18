import { ChargePointData } from './interfaces';

// FORM VALIDATION
export const validateForm = (name: string, value: number): string => {
  switch (name) {
    case 'chargePoints':
      return value < 1 || value > 20
        ? 'Charge Points must be between 1 and 20.'
        : '';
    case 'arrivalProbability':
      return value < 20 || value > 200
        ? 'Arrival Probability must be between 20% and 200%.'
        : '';
    case 'carConsumption':
      return value < 12 || value > 40
        ? 'Car Consumption must be between 12.0 and 40.0 kWh.'
        : '';
    case 'chargingPower':
      return value < 1 || value > 11
        ? 'Charging Power must be between 1 and 11 kW.'
        : '';
    default:
      return '';
  }
};

// HOURLY CHART
// BAR COLORS PALETTE
export const CP_COLORS: { [key: string]: string } = {
  CP1: '#8884d8',
  CP2: '#82ca9d',
  CP3: '#ffc658',
  CP4: '#d88484',
  CP5: '#84d8d8',
  CP6: '#a9ca82',
  CP7: '#c658ff',
  CP8: '#ff84d8',
  CP9: '#82d8ff',
  CP10: '#d8ca82',
  CP11: '#ffb6c1',
  CP12: '#8dd88c',
  CP13: '#7b68ee',
  CP14: '#e9967a',
  CP15: '#32cd32',
  CP16: '#6a5acd',
  CP17: '#ff4500',
  CP18: '#48d1cc',
  CP19: '#daa520',
  CP20: '#2f4f4f',
};

// HEAT MAP CHART
export const aggregateDailyData = (mockedData: ChargePointData[]) => {
  const result: { day: string; totalEnergy: number; totalEvents: number }[] =
    [];

  const dayMap = new Map<
    string,
    { totalEnergy: number; totalEvents: number }
  >();

  mockedData.forEach((cp) => {
    cp.dailyData.forEach((daily) => {
      const { day, totalEnergy, events } = daily;

      if (!dayMap.has(day)) {
        dayMap.set(day, { totalEnergy: 0, totalEvents: 0 });
      }

      const current = dayMap.get(day)!;
      current.totalEnergy += totalEnergy;
      current.totalEvents += events;
      dayMap.set(day, current);
    });
  });

  dayMap.forEach((value, key) => {
    result.push({
      day: key,
      totalEnergy: value.totalEnergy,
      totalEvents: value.totalEvents,
    });
  });

  return result.sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  );
};

interface DailyData {
  day: string;
  totalEnergy: number;
  totalEvents: number;
}

interface SummaryData {
  totalEnergyYear: number;
  totalEventsYear: number;
  totalEnergyMonth: number;
  totalEventsMonth: number;
  totalEnergyWeek: number;
  totalEventsWeek: number;
  totalEnergyDay: number;
  totalEventsDay: number;
  highestEnergyDay: DailyData;
  lowestEnergyDay: DailyData;
  highestEventsDay: DailyData;
  lowestEventsDay: DailyData;
}

// CALCULATE THE SUMMARIES FOR THE COMPONENT
export const calculateSummaries = (
  aggregatedDailyEnergyEvents: DailyData[]
): SummaryData => {
  const totalEnergyYear = aggregatedDailyEnergyEvents.reduce(
    (sum, entry) => sum + entry.totalEnergy,
    0
  );

  const totalEventsYear = aggregatedDailyEnergyEvents.reduce(
    (sum, entry) => sum + entry.totalEvents,
    0
  );

  const totalEnergyMonth = Math.round(totalEnergyYear / 12);
  const totalEventsMonth = Math.round(totalEventsYear / 12);

  const totalEnergyWeek = Math.round(totalEnergyYear / 52);
  const totalEventsWeek = Math.round(totalEventsYear / 52);

  const totalEnergyDay = Math.round(totalEnergyYear / 365);
  const totalEventsDay = Math.round(totalEventsYear / 365);

  const highestEnergyDay = aggregatedDailyEnergyEvents.reduce((max, entry) =>
    entry.totalEnergy > max.totalEnergy ? entry : max
  );

  const lowestEnergyDay = aggregatedDailyEnergyEvents.reduce((min, entry) =>
    entry.totalEnergy < min.totalEnergy ? entry : min
  );

  const highestEventsDay = aggregatedDailyEnergyEvents.reduce((max, entry) =>
    entry.totalEvents > max.totalEvents ? entry : max
  );

  const lowestEventsDay = aggregatedDailyEnergyEvents.reduce((min, entry) =>
    entry.totalEvents < min.totalEvents ? entry : min
  );

  return {
    totalEnergyYear,
    totalEventsYear,
    totalEnergyMonth,
    totalEventsMonth,
    totalEnergyWeek,
    totalEventsWeek,
    totalEnergyDay,
    totalEventsDay,
    highestEnergyDay,
    lowestEnergyDay,
    highestEventsDay,
    lowestEventsDay,
  };
};

// COLOR PALETTE
export const getColor = (value: number): string => {
  if (value < 100) return 'bg-blue-100';
  if (value < 200) return 'bg-blue-200';
  if (value < 300) return 'bg-blue-300';
  if (value < 400) return 'bg-blue-400';
  if (value < 500) return 'bg-blue-500';
  if (value < 600) return 'bg-blue-600';
  if (value < 700) return 'bg-blue-700';
  if (value < 1100) return 'bg-green-100';
  if (value < 1150) return 'bg-green-300';
  if (value < 1200) return 'bg-green-500';
  if (value < 1225) return 'bg-yellow-200';
  if (value < 1250) return 'bg-yellow-400';
  if (value < 1275) return 'bg-orange-300';
  if (value < 1300) return 'bg-orange-500';
  if (value < 1325) return 'bg-red-300';
  if (value < 1350) return 'bg-red-500';
  return 'bg-red-700';
};
