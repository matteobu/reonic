import { ChargePointData, HourlyData } from './outputs.interfaces';

export interface FilterModalProps {
  mockedData: ChargePointData[];
  activeCPs: string[];
  toggleCP: (cpId: string) => void;
  onClose: () => void;
}

export interface HourDetailsModalProps {
  selectedHour: string | null;
  hourlyChargingData: HourlyData[];
  onClose: () => void;
  setSelectedHour: (hour: string) => void;
}

export interface ChargePointConfigRowProps {
  index: number;
  data: { chargePoints: number; chargingPower: number };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
