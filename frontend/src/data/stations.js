/**
 * Mock Station Dataset - Northern / North Central High-Density Corridors
 * @type {import('../types/station').Station[]}
 */
export const mockStations = [
  {
    id: 'NDLS',
    code: 'NDLS',
    name: 'New Delhi',
    division: 'Delhi',
    zone: 'NR',
    totalTracks: 16,
    totalPlatforms: 16,
    platforms: [
      { platformNumber: 1, isOccupied: true, occupiedByTrainId: 'TRN-22436', lengthMeters: 650 },
      { platformNumber: 2, isOccupied: false, occupiedByTrainId: null, lengthMeters: 600 },
      { platformNumber: 3, isOccupied: true, occupiedByTrainId: 'TRN-12002', lengthMeters: 620 },
      { platformNumber: 4, isOccupied: false, occupiedByTrainId: null, lengthMeters: 600 },
    ],
    coordinates: { lat: 28.6429, lng: 77.2195 },
    operationalState: 'NORMAL',
  },
  {
    id: 'GZB',
    code: 'GZB',
    name: 'Ghaziabad Junction',
    division: 'Delhi',
    zone: 'NR',
    totalTracks: 8,
    totalPlatforms: 6,
    platforms: [
      { platformNumber: 1, isOccupied: false, occupiedByTrainId: null, lengthMeters: 580 },
      { platformNumber: 2, isOccupied: true, occupiedByTrainId: 'TRN-FRT-901', lengthMeters: 720 },
    ],
    coordinates: { lat: 28.6679, lng: 77.4326 },
    operationalState: 'NORMAL',
  },
  {
    id: 'ALJN',
    code: 'ALJN',
    name: 'Aligarh Junction',
    division: 'Prayagraj',
    zone: 'NCR',
    totalTracks: 7,
    totalPlatforms: 5,
    platforms: [
      { platformNumber: 1, isOccupied: false, occupiedByTrainId: null, lengthMeters: 550 },
      { platformNumber: 2, isOccupied: true, occupiedByTrainId: 'TRN-12424', lengthMeters: 640 },
    ],
    coordinates: { lat: 27.8974, lng: 78.088 },
    operationalState: 'CONGESTED',
  },
  {
    id: 'TDL',
    code: 'TDL',
    name: 'Tundla Junction',
    division: 'Prayagraj',
    zone: 'NCR',
    totalTracks: 6,
    totalPlatforms: 5,
    platforms: [
      { platformNumber: 1, isOccupied: false, occupiedByTrainId: null, lengthMeters: 560 },
    ],
    coordinates: { lat: 27.2062, lng: 78.2435 },
    operationalState: 'NORMAL',
  },
  {
    id: 'CNB',
    code: 'CNB',
    name: 'Kanpur Central',
    division: 'Prayagraj',
    zone: 'NCR',
    totalTracks: 14,
    totalPlatforms: 10,
    platforms: [
      { platformNumber: 1, isOccupied: true, occupiedByTrainId: 'TRN-12302', lengthMeters: 680 },
      { platformNumber: 2, isOccupied: false, occupiedByTrainId: null, lengthMeters: 620 },
    ],
    coordinates: { lat: 26.4539, lng: 80.3512 },
    operationalState: 'NORMAL',
  },
];
