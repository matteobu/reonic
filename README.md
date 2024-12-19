# Reonic Simulation Test

This project is a frontend application designed to simulate the charging of electric cars in a shop parking lot. Users can input various parameters to observe how different configurations affect the charging process.

## Features

- **Simulation Parameters**: Configure the number of charging points, arrival probability of cars, car consumption (in kWh), and charging power per charging point (in kW).
- **Dynamic Data Generation**: Simulate charging events based on user inputs.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS:
  - Wide Screen;
  - MacBook Pro 13";
  - iPad Pro;
  - iPhone 14 Pro Max.
- **Translation**: Supporting English, German and Italian languages.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/matteobu/reonic.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd reonic
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create the mocked data**:

   ```bash
   cd src/mocks
   node generateData.mjs
   ```

   The application should now have the mocked data in the folder `src/mocks`.

5. **Start the development server**:

   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

1. **Configure Simulation Parameters**: Adjust the input fields to set the number of charging points, arrival probability, car consumption, and charging power.
2. **View Results**: Analyze the output, including total energy charged, number of charging events, and heatmaps of consumed energy.

## Assumptions

- Each car requires a charging duration proportional to its consumption and the charging power of the station.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project was developed as part of a frontend task for Reonic.

## Web App Preview

## Landing Page

This is the landing page displayed when `npm start` is run.

### HeadBar

The **HeadBar** features:

- The application's name on the left.
- A language selector and a link to the repository on the right.

### SideBar

The **SideBar** contains:

- Four functional buttons, including the **InputForm** at the top.
- Three icons linking to the main components:
  - **Daily Chart**
  - **Hourly Chart**
  - **Consumption Heatmap**

![Landing Page](./public/appPreview/LandingPage.png)

### Input for Simulation

The **Input Form** allows users to configure the parameters for the simulation. It includes four main inputs:

- **Charge Points**: A value between `1` and `20`, default is `20`.
- **Charging Power**: A value between `1` and `11` (kW), default is `11`.
- **Arrival Probability Multiplier**: A percentage between `20%` and `200%`, default is `100%`.
- **Car Consumption**: A value between `12.0` and `40.0` (kWh), default is `18`.

If any input value falls outside the predefined range, an error message will be displayed in the form, such as:

- `Car Consumption must be between 12.0 and 40.0 kWh`.

![Error Example](./public/appPreview/errorExample.png)

The **Submit Button** becomes enabled only when all inputs meet the required conditions (i.e., all values are within the valid ranges).

![Submit Disabled](./public/appPreview/generalErrorSubmit.png)

### BONUS: Additional Customization

![Add Remove Btn](./public/appPreview/addRemoveBtn.png)

The form includes two buttons: `+` and `-`. These allow users to add or remove configurations for multiple Charge Points (CPs). Users can customize configurations, such as:

- `5 CPs × 10 kW + 3 CPs × 5 kW + 1 CP × 30 kW`.

### Limits and Constraints

The customization is subject to the following limits:

1. **Maximum Charge Points (CPs)**: The total number of CPs cannot exceed `20`.
2. **Maximum Total Charging Power**: The combined charging power cannot exceed `220 kW`.

This ensures the simulation remains within realistic and manageable bounds.

![InputForSimulation](./public/appPreview/InputForSimulation.png)

### Daily Tooltip

When hovering over a bar in the chart, it displays the daily details of each CP, such as:

- BULK: Fast initial charging with constant current to quickly replenish most of the battery.
- ABS (Absorption): Slower charging with constant voltage to top off the battery safely.
- FLOATING: Maintenance phase, providing minimal current to keep the battery fully charged.

![Tooltip](./public/appPreview/DailyTooltip.png)

### Language Selection

The app supports the following languages:

- **English** (default)
- **German**
- **Italian**

![Languages](./public/appPreview/Languages.png)

### Total Energy Pie

Thi pie shows the total consumption of the day for each CP.

![Total Energy Pie](./public/appPreview/TotalEnergyPie.png)

### Hourly Chart

Top Chart - Hourly Line Chart

This chart displays the hourly energy consumption (kW) for each Charge Point (CP) over a 24-hour period. Each line represents a single Charge Point, allowing you to observe individual trends and variations in energy usage throughout the day.

Bottom Chart - Hourly Stacked Bar Chart

This chart visualizes the aggregated energy consumption (kW) across all Charge Points for each hour. Each bar is segmented by Charge Points, providing a clear comparison of their contributions to the total energy consumption during each hour.

![Hourly Chart](./public/appPreview/HourlyChart.png)

### Hourly Chart Details

### Hour Details Modal

This modal provides detailed information about energy consumption for each Charge Point (CP) at a specific hour. Users can:

- **Select an Hour**: A dropdown allows users to choose a specific hour of the day.
- **View Energy Consumption**: Displays the energy consumption (in kW) for each CP during the selected hour.

![Hourly Chart Details](./public/appPreview/HourlyChartDetails.png)

### Filter Charge Points Modal

This modal enables users to activate or deactivate individual Charge Points (CPs). Features include:

- **Interactive Buttons**: Each CP is represented by a button showing its current status (`Activated` or `Not Activated`).
- **Dynamic Updates**: Clicking on a button toggles the CP's status, updating its availability in the simulation.

![Filter Charge Points](./public/appPreview/FilterCP.png)

### Consumption Heatmap

This page provides a visual overview of energy consumption and events over time, accompanied by a summary of key metrics.

#### **Heatmap**

- **Total Energy Heatmap**: Displays energy consumption using a color-coded grid, where each square represents a day and colors indicate consumption levels (e.g., red for high, yellow for moderate, green for low).
- **Total Events Heatmap**: Visualizes the number of charging events per day using a blue gradient grid, with darker shades representing higher event counts.

#### **Summary Metrics**

The summary section at the bottom provides detailed aggregated metrics, including:

- **Yearly Totals**: Total energy consumed and events over the year.
- **Monthly, Weekly, and Daily Averages**: Average energy and events across these timeframes.
- **Highest and Lowest Energy**:
  - **Days**: Days with the highest and lowest total energy consumption.
  - **Months**: Months with the highest and lowest total energy consumption.
  - **Weeks**: Weeks with the highest and lowest total energy consumption.
- **Most and Least Events**: Days with the highest and lowest number of charging events.

This page helps users quickly identify trends and patterns in energy consumption and charging activity.

![Consumption Heatmap](./public/appPreview/ConsumptionHeatMap.png)
