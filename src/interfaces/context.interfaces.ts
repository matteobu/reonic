export interface AppData {
  cp: number;
  formData: FormData;
  configs: CPConfigs;
}
interface CPConfig {
  chargePoints: number;
  chargingPower: number;
}
export type CPConfigs = CPConfig[];
export interface FormData {
  chargePoints: number;
  arrivalProbability: number;
  carConsumption: number;
  chargingPower: number;
}

export interface DataContextProps {
  chargePoints: number;
  setData: (data: AppData) => void;
  formData: FormData;
  configs: CPConfigs;
  isModalVisible: boolean;
  toggleModal: () => void;
  activeComponents: { [key: string]: boolean };
  setActiveComponent: (key: 'c1' | 'c2' | 'c3') => void;
}
