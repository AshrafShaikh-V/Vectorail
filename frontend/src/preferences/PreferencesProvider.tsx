import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences, DEFAULT_PREFERENCES } from './types';

interface PreferencesContextType extends UserPreferences {
  updatePreference: <K extends keyof UserPreferences>(
    category: K,
    updates: Partial<UserPreferences[K]>
  ) => void;
  resetPreferences: () => void;
}

export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const PREFS_STORAGE_KEY = 'vectorail_user_prefs';

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const saved = localStorage.getItem(PREFS_STORAGE_KEY);
    if (saved) {
      try {
        setPrefs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user preferences', e);
      }
    }
  }, []);

  const updatePreference = <K extends keyof UserPreferences>(
    category: K,
    updates: Partial<UserPreferences[K]>
  ) => {
    setPrefs((prev) => {
      const next = {
        ...prev,
        [category]: {
          ...prev[category],
          ...updates,
        },
      };
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetPreferences = () => {
    setPrefs(DEFAULT_PREFERENCES);
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
  };

  // Merge state with methods for the provider value
  const value = {
    ...prefs,
    updatePreference,
    resetPreferences,
  } as PreferencesContextType;

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
