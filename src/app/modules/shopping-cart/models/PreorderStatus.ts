import { Moment } from 'moment';

export interface PreorderStatus {
  currentStatus: CurrentStatus;
  openingHours: OpeningHours;
}

export interface OpeningHours {
  today: Workday;
  tomorrow: Workday;
}

export interface Workday {
  isOpen: boolean;
  intervals: Interval[];
}

export interface Interval {
  start: Moment;
  end: Moment;
}

export interface CurrentStatus {
  isOpen: boolean;
  preparationTimeMinutes: number;
}
