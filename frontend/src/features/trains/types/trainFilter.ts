import { TrainType, TrainOperationalStatus, TrainServiceStatus, TrainDirection } from './train';

export interface TrainFilter {
  status?: TrainOperationalStatus;
  serviceStatus?: TrainServiceStatus;
  type?: TrainType;
  lineId?: string;
  stationId?: string;
  sectionId?: string;
  direction?: TrainDirection;
  maxDelay?: number;
  search?: string;
}

export interface TrainSummary {
  totalTrains: number;
  activeTrains: number;
  onTimeTrains: number;
  delayedTrains: number;
  stoppedTrains: number;
  cancelledTrains: number;
  averageDelay: number;
}
