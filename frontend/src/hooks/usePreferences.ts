import { useContext } from 'react';
import { PreferencesContext } from '@/preferences/PreferencesProvider';

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
