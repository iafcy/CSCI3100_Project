import request from 'supertest';
import express from 'express';

import licenseRouter from '../routes/licenseRouter';
import licenseService from '../services/licenseService';

jest.mock('../services/licenseService');
const mockedLicenseService = licenseService as jest.Mocked<
  typeof licenseService
>;

const app = express();
app.use(express.json());
app.use('/license', licenseRouter);

describe('POST /license/verify', () => {
  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/license/verify');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('License file is missing');
  });

  it('should return 400 if file is not a text file', async () => {
    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('dummy content'), {
        filename: 'image.png',
        contentType: 'image/png',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please upload a txt file');
  });

  it('should return 500 if cannot read license key', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue(null);

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('dummy content'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error reading the license file');
  });

  it('should return 400 if license key does not exist', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: false,
      activated: false,
    });

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Not a valid license key');
  });

  it('should return 400 if license key already activated', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: true,
      activated: true,
    });

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('License key is already activated');
  });

  it('should return 200 if license key exists and not activated', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: true,
      activated: false,
    });

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({ license_id: 'DUMMY_LICENSE' });
  });
});
