import licenseService from '../services/licenseService';
import fs from 'fs/promises';
import path from 'path';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  unlink: jest.fn(),
}));

describe('licenseService.readLicenseKey', () => {
  it('should read and return the trimmed license key', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue('  DUMMY_LICENSE  ');

    const result = await licenseService.readLicenseKey('some/path/key.txt');

    expect(result).toBe('DUMMY_LICENSE');
    expect(fs.readFile).toHaveBeenCalledWith(
      path.resolve('some/path/key.txt'),
      'utf8',
    );
    expect(fs.unlink).toHaveBeenCalledWith(path.resolve('some/path/key.txt'));
  });

  it('should return null if reading fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Failed to read'));

    const result = await licenseService.readLicenseKey('some/path/key.txt');

    expect(result).toBeNull();
    expect(fs.readFile).toHaveBeenCalledWith(
      path.resolve('some/path/key.txt'),
      'utf8',
    );
  });
});
