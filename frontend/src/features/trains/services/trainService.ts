import { Train, TrainSummary, TrainFilter } from '../types/train';
import { TrainFilter as TrainFilterType } from '../types/trainFilter';
import { MOCK_TRAINS } from '../data/mockTrains';

export const trainService = {
  async getTrains(): Promise<Train[]> {
    return MOCK_TRAINS;
  },

  async getTrainById(id: string): Promise<Train | undefined> {
    return MOCK_TRAINS.find(t => t.id === id);
  },

  async getTrainsByFilter(filter: TrainFilterType): Promise<Train[]> {
    return MOCK_TRAINS.filter(train => {
      if (filter.status && train.status !== filter.status) return false;
      if (filter.serviceStatus && train.serviceStatus !== filter.serviceStatus) return false;
      if (filter.type && train.type !== filter.type) return false;
      if (filter.lineId && train.lineId !== filter.lineId) return false;
      if (filter.stationId && (train.currentStationId !== filter.stationId || train.originStationId !== filter.stationId || train.destinationStationId !== filter.stationId)) return false;
      if (filter.sectionId && train.currentSectionId !== filter.sectionId) return false;
      if (filter.direction && train.direction !== filter.direction) return false;
      if (filter.maxDelay && train.schedule.delayMinutes > filter.maxDelay) return false;
      if (filter.search) {
        const s = filter.search.toLowerCase();
        const matches =
          train.name.toLowerCase().includes(s) ||
          train.trainNumber.toLowerCase().includes(s) ||
          train.operator.toLowerCase().includes(s);
        if (!matches) return false;
      }
      return true;
    });
  },

  async getTrainSummary(): Promise<TrainSummary> {
    const trains = MOCK_TRAINS;
    const total = trains.length;
    const active = trains.filter(t => t.status !== 'Cancelled' && t.status !== 'Terminated').length;
    const onTime = trains.filter(t => t.serviceStatus === 'On Time').length;
    const delayed = trains.filter(t => t.serviceStatus.includes('Delay')).length;
    const stopped = trains.filter(t => t.status === 'Stopped' || t.status === 'Boarding').length;
    const cancelled = trains.filter(t => t.status === 'Cancelled').length;

    const totalDelay = trains.reduce((acc, t) => acc + t.schedule.delayMinutes, 0);
    const avgDelay = total > 0 ? totalDelay / total : 0;

    return {
      totalTrains: total,
      activeTrains: active,
      onTimeTrains: onTime,
      delayedTrains: delayed,
      stoppedTrains: stopped,
      cancelledTrains: cancelled,
      averageDelay: avgDelay,
    };
  },

  async getTrainsByStatus(status: string): Promise<Train[]> {
    return this.getTrainsByFilter({ status: status as any });
  },

  async getTrainsByLine(lineId: string): Promise<Train[]> {
    return this.getTrainsByFilter({ lineId });
  },

  async getTrainsByStation(stationId: string): Promise<Train[]> {
    return this.getTrainsByFilter({ stationId });
  },

  async getTrainsBySection(sectionId: string): Promise<Train[]> {
    return this.getTrainsByFilter({ sectionId });
  },

  async getDelayedTrains(): Promise<Train[]> {
    return this.getTrainsByFilter({ serviceStatus: 'Delayed' }); // Simplified for mock
  },
};
