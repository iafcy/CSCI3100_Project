import { supabaseAdmin } from '../utils/supabase';
import fs from 'fs/promises';
import path from 'path';

const checkLicense = async (licenseKey: string) => {
  const { data, error } = await supabaseAdmin
    .from('licenses')
    .select('id, is_activated')
    .eq('id', licenseKey)
    .single();

  return data
    ? { exists: true, activated: data.is_activated }
    : { exists: false, activated: false };
};

const removeFile = async (path: string) => {
  await fs.unlink(path);
};

const readLicenseKey = async (licenseKeyFilePath: string) => {
  try {
    const filePath = path.resolve(licenseKeyFilePath);
    const licenseKey = (await fs.readFile(filePath, 'utf8')).trim();

    await removeFile(filePath);

    return licenseKey;
  } catch (err) {
    return null;
  }
};

export default {
  checkLicense,
  readLicenseKey,
  removeFile,
};
