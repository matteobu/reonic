// ChargePointBarChart
interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  chargePoint: string;
  yieldValue: number;
  pMax: number;
  errors: number;
}

interface ChargePointData {
  chargePoint: string;
  BULK: number;
  FLOATING: number;
  ABS: number;
  yield: number;
  pMax: number;
  errors: number;
}

// ChargePointBarChart
export type { CustomLabelProps, ChargePointData };
