import { ReactNode } from 'react';

export interface NavBarProps {
  name: string;
  shortName: string;
  onDateChange: (date: string) => void;
  isOnDateChange: boolean;
  children?: ReactNode;
}
