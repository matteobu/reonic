import { ReactNode } from 'react';

export interface NavBarProps {
  name: string;
  onDateChange: (date: string) => void;
  isOnDateChange: boolean;
  children?: ReactNode;
}
