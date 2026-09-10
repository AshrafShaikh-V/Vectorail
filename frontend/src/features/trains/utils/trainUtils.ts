import { TrainServiceStatus, TrainOperationalStatus } from '../types/train';

export const getDelaySeverity = (minutes: number) => {
  if (minutes <= 0) return 'On Time';
  if (minutes <= 5) return 'Minor';
  if (minutes <= 15) return 'Moderate';
  if (minutes <= 30) return 'Major';
  return 'Severe';
};

export const getOccupancyLevel = (percentage: number) => {
  if (percentage < 30) return 'Low';
  if (percentage < 70) return 'Normal';
  if (percentage < 90) return 'High';
  return 'Overloaded';
};

export const getTrainStatusVariant = (status: TrainOperationalStatus | TrainServiceStatus) => {
  switch (status) {
    case 'Running':
    case 'On Time':
      return 'emerald';
    case 'Delayed':
    case 'Minor Delay':
    case 'Moderate Delay':
      return 'amber';
    case 'Critical Delay':
    case 'Cancelled':
      return 'rose';
    case 'Stopped':
    case 'Boarding':
      return 'sky';
    default:
      return 'zinc';
  }
};

export const formatTrainSchedule = (time: string) => {
  if (!time || time === 'N/A') return '—';
  return time;
};

export const calculateTrainDelay = (scheduled: string, actual: string) => {
  // Simple mock calculation for this phase
  return 0;
};
