import { ReactNode } from 'react';

export interface ComponentHeaderProps {
  name: string;
  onDateChange: (date: string) => void;
  isOnDateChange: boolean;
  children?: ReactNode;
}
