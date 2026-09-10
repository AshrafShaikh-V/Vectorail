export interface UserPreferences {
  appearance: {
    theme: 'dark' | 'light';
    density: 'comfortable' | 'compact';
  };
  notifications: {
    operational: boolean;
    critical: boolean;
    system: boolean;
    maintenance: boolean;
  };
  operations: {
    refreshInterval: 'off' | '15s' | '30s' | '1m' | '5m';
    showSystemStatus: boolean;
    showWarnings: boolean;
    compactTables: boolean;
  };
  sidebar: {
    rememberCollapsed: boolean;
  };
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  appearance: {
    theme: 'dark',
    density: 'comfortable',
  },
  notifications: {
    operational: true,
    critical: true,
    system: true,
    maintenance: true,
  },
  operations: {
    refreshInterval: '30s',
    showSystemStatus: true,
    showWarnings: true,
    compactTables: false,
  },
  sidebar: {
    rememberCollapsed: false,
  },
};
