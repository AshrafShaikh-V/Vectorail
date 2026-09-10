export type TrainType = 'Express' | 'Intercity' | 'Regional' | 'Local' | 'Freight' | 'Special';
export type TrainOperationalStatus = 'Running' | 'Stopped' | 'Boarding' | 'Arriving' | 'Departed' | 'Cancelled' | 'Terminated';
export type TrainServiceStatus = 'On Time' | 'Delayed' | 'Minor Delay' | 'Major Delay' | 'Critical Delay';
export type TrainDirection = 'UP' | 'DOWN';

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  type: TrainType;
  operator: string;
  status: TrainOperationalStatus;
  serviceStatus: TrainServiceStatus;
  lineId: string;
  routeId: string;
  originStationId: string;
  destinationStationId: string;
  currentStationId?: string;
  nextStationId?: string;
  currentSectionId?: string;
  platform?: string;
  direction: TrainDirection;
  currentSpeed: number;
  maxSpeed: number;
  capacity: number;
  passengerLoad: number;
  lastUpdated: string;
  schedule: TrainSchedule;
}
