import fs from 'fs';

//  Function to generate mock data for 20 charge points
function generateMockData(chargePoints = 20) {
  const data = [];

  for (let i = 1; i <= chargePoints; i++) {
    const dailyData = [];
    const startDate = new Date('2024-01-01');
    for (let j = 0; j < 365; j++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + j);

      const BULK = Math.floor(Math.random() * 40) + 10;
      const FLOATING = Math.floor(Math.random() * 25) + 5;
      const ABS = Math.floor(Math.random() * 20) + 5;

      dailyData.push({
        day: currentDate.toISOString().split('T')[0],
        BULK: BULK,
        FLOATING: FLOATING,
        ABS: ABS,
        totalEnergy: ABS + BULK + FLOATING,
        events: Math.floor(Math.random() * 15) + 2,
        peakDemand: Math.floor(Math.random() * 100) + 50,
        errors: Math.floor(Math.random() * 4),
      });
    }

    // Weekly data for 52 weeks
    const weeklySummary = [];
    for (let w = 1; w <= 52; w++) {
      weeklySummary.push({
        week: `W${w}`,
        totalEnergy: Math.floor(Math.random() * 3000) + 3000,
        events: Math.floor(Math.random() * 100) + 50,
        errors: Math.floor(Math.random() * 5),
      });
    }

    const monthlySummary = [];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (let month of months) {
      monthlySummary.push({
        month: month,
        totalEnergy: Math.floor(Math.random() * 10000) + 10000, // Between 10000-20000
        events: Math.floor(Math.random() * 200) + 200, // Between 200-400
        errors: Math.floor(Math.random() * 10) + 5, // Between 5-15
      });
    }

    const annualSummary = [
      {
        year: 2023,
        totalEnergy: Math.floor(Math.random() * 30000) + 120000, // Between 120000-150000
        events: Math.floor(Math.random() * 500) + 2500, // Between 2500-3000
        errors: Math.floor(Math.random() * 30) + 20, // Between 20-50
      },
      {
        year: 2024,
        totalEnergy: Math.floor(Math.random() * 30000) + 120000,
        events: Math.floor(Math.random() * 500) + 2500,
        errors: Math.floor(Math.random() * 30) + 20,
      },
    ];

    data.push({
      id: `CP${i}`,
      pMax: 11,
      errors: Math.floor(Math.random() * 3),
      dailyData,
      weeklySummary,
      monthlySummary,
      annualSummary,
    });
  }
  return data;
}

const mockData = generateMockData();
fs.writeFileSync('mock_data.json', JSON.stringify(mockData, null, 2));
