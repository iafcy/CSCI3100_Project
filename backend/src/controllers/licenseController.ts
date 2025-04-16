import licenseService from '../services/licenseService';

const verifyLicense = async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ message: 'License file is missing' });
  }

  if (req.file.mimetype !== 'text/plain') {
    return res.status(400).json({ message: 'Please upload a txt file' });
  }

  const licenseKey = await licenseService.readLicenseKey(req.file.path);

  if (!licenseKey) {
    return res.status(500).json({ message: 'Error reading the license file' });
  }

  const { exists, activated } = await licenseService.checkLicense(licenseKey);

  if (exists && !activated) {
    return res.status(200).json({
      message: 'success',
      data: {
        license_id: licenseKey
      }
    });
  }
  
  if (!exists) {
    return res.status(400).json({
      message: 'Not a valid license key',
    });
  }
  
  if (activated) {
    return res.status(400).json({
      message: 'License key is already activated',
    });
  }
}

export default {
  verifyLicense
};