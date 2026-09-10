import { Station, RailwaySection } from '@/features/network/types';

export interface RouteStop {
  stationId: string;
  scheduledArrival?: string;
  scheduledDeparture?: string;
  order: number;
}

export interface RouteSegment {
  sectionId: string;
  order: number;
}

export interface TrainRoute {
  id: string;
  name: string;
  lineId: string;
  stops: RouteStop[];
  segments: RouteSegment[];
}
