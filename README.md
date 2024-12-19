# Reonic Simulation Test

This project is a frontend application designed to simulate the charging of electric cars in a shop parking lot. Users can input various parameters to observe how different configurations affect the charging process.

## Features

- **Simulation Parameters**: Configure the number of charging points, arrival probability of cars, car consumption (in kWh), and charging power per charging point (in kW).
- **Dynamic Data Generation**: Simulate charging events based on user inputs.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **Translation**: Supporting English 🫖, German 🥨 and Italian 🍕 languages.

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

### Input For Simulation

![InputForSimulation](./public/appPreview/InputForSimulation.png)

### Daily Tooltip

![Tooltip](./public/appPreview/DailyTooltip.png)

### Languages

![Languages](./public/appPreview/Languages.png)

### Total Energy Pie

![Total Energy Pie](./public/appPreview/TotalEnergyPie.png)

### Hourly Chart

![Hourly Chart](./public/appPreview/HourlyChart.png)

### Hourly Chart Details

![Hourly Chart Details](./public/appPreview/HourlyChartDetails.png)

### Filter Charge Points

![Filter Charge Points](./public/appPreview/FilterCP.png)

### Consumption Heatmap

![Consumption Heatmap](./public/appPreview/ConsumptionHeatMap.png)
