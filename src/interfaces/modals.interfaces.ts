export interface FilterModalProps {
  mockedData: any[];
  activeCPs: string[];
  toggleCP: (cpId: string) => void;
  onClose: () => void;
}

export interface HourDetailsModalProps {
  selectedHour: string | null;
  hourlyChargingData: any[];
  onClose: () => void;
  setSelectedHour: (hour: string) => void;
}

export interface ChargePointConfigRowProps {
  index: number;
  data: { chargePoints: number; chargingPower: number };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
