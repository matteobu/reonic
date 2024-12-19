import {
  ChargePointData,
  ConsumptionDailyData,
  SummaryData,
} from '../interfaces/outputs.interfaces';
import i18next from 'i18next';

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

// This functions is to reduce the number of CP is the user inputs a number lower than 20
export const getRandomArray = (
  originalArray: ChargePointData[],
  desiredLength: number
): ChargePointData[] => {
  // Clone the original array to avoid modifying it
  const newArray = [...originalArray];

  // Remove random indices until the array length matches desiredLength
  while (newArray.length > desiredLength) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    newArray.splice(randomIndex, 1); // Remove one element at the random index
  }

  return newArray;
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

// CALCULATE THE SUMMARIES FOR THE COMPONENT

export const calculateAllSummaries = (
  aggregatedDailyEnergyEvents: ConsumptionDailyData[]
): SummaryData[] => {
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

  const monthlyMap = new Map<string, number>();
  const weeklyMap = new Map<string, number>();

  aggregatedDailyEnergyEvents.forEach((entry) => {
    const month = new Date(entry.day).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const week = `${new Date(entry.day).getFullYear()}-W${Math.ceil(
      new Date(entry.day).getDate() / 7
    )}`;

    // Monthly Aggregation
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + entry.totalEnergy);

    // Weekly Aggregation
    weeklyMap.set(week, (weeklyMap.get(week) || 0) + entry.totalEnergy);
  });

  const highestMonth = [...monthlyMap.entries()].reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );
  const lowestMonth = [...monthlyMap.entries()].reduce((min, curr) =>
    curr[1] < min[1] ? curr : min
  );

  const highestWeek = [...weeklyMap.entries()].reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );
  const lowestWeek = [...weeklyMap.entries()].reduce((min, curr) =>
    curr[1] < min[1] ? curr : min
  );

  const summaryData = [
    {
      title: i18next.t('summary.yearly'),
      energy: `${new Intl.NumberFormat('de-DE').format(totalEnergyYear)} kWh`,
      events: `${new Intl.NumberFormat('de-DE').format(totalEventsYear)}`,
    },
    {
      title: i18next.t('summary.monthlyAvg'),
      energy: `${new Intl.NumberFormat('de-DE').format(totalEnergyMonth)} kWh`,
      events: `${new Intl.NumberFormat('de-DE').format(totalEventsMonth)}`,
    },
    {
      title: i18next.t('summary.weeklyAvg'),
      energy: `${new Intl.NumberFormat('de-DE').format(totalEnergyWeek)} kWh`,
      events: `${new Intl.NumberFormat('de-DE').format(totalEventsWeek)}`,
    },
    {
      title: i18next.t('summary.dailyAvg'),
      energy: `${new Intl.NumberFormat('de-DE').format(totalEnergyDay)} kWh`,
      events: `${new Intl.NumberFormat('de-DE').format(totalEventsDay)}`,
    },
    {
      title: i18next.t('summary.highestTotalEnergy'),
      energy: `${new Intl.NumberFormat('de-DE').format(
        highestEnergyDay.totalEnergy
      )} kWh`,
      extraContent: highestEnergyDay.day,
    },
    {
      title: i18next.t('summary.lowestTotalEnergy'),
      energy: `${new Intl.NumberFormat('de-DE').format(
        lowestEnergyDay.totalEnergy
      )} kWh`,
      extraContent: lowestEnergyDay.day,
    },
    {
      title: i18next.t('summary.mostEvents'),
      events: `${new Intl.NumberFormat('de-DE').format(
        highestEventsDay.totalEvents
      )}`,
      extraContent: highestEventsDay.day,
    },
    {
      title: i18next.t('summary.leastEvents'),
      events: `${new Intl.NumberFormat('de-DE').format(
        lowestEventsDay.totalEvents
      )}`,
      extraContent: lowestEventsDay.day,
    },
    {
      title: i18next.t('summary.highestEnergyMonth'),
      energy: `${new Intl.NumberFormat('de-DE').format(highestMonth[1])} kWh`,
      extraContent: highestMonth[0],
    },
    {
      title: i18next.t('summary.lowestEnergyMonth'),
      energy: `${new Intl.NumberFormat('de-DE').format(lowestMonth[1])} kWh`,
      extraContent: lowestMonth[0],
    },
    {
      title: i18next.t('summary.highestEnergyWeek'),
      energy: `${new Intl.NumberFormat('de-DE').format(highestWeek[1])} kWh`,
      extraContent: highestWeek[0],
    },
    {
      title: i18next.t('summary.lowestEnergyWeek'),
      energy: `${new Intl.NumberFormat('de-DE').format(lowestWeek[1])} kWh`,
      extraContent: lowestWeek[0],
    },
  ];

  return summaryData;
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

// TOTAL ENERGY PIE
export const TOTAL_ENERGY_PIE_COLORS = [
  '#9AA6B2',
  '#BCCCDC',
  '#D9EAFD',
  '#FFBB28',
  '#FF8042',
];
