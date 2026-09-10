export interface TrainSchedule {
  scheduledDeparture: string;
  actualDeparture?: string;
  scheduledArrival: string;
  estimatedArrival: string;
  delayMinutes: number;
}
