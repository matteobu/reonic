export interface AppData {
  chargePoints: number;
}

export interface DataContextProps {
  chargePoints: number;
  setData: (data: number) => void;
  isModalVisible: boolean;
  toggleModal: () => void;
  activeComponents: { [key: string]: boolean };
  setActiveComponent: (key: 'c1' | 'c2' | 'c3') => void;
}
