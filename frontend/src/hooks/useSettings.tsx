import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('SettingsContext must be used inside SettingsPovider');

  return context;
}

export default useSettings;
